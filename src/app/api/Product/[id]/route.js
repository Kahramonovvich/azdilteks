import axios from 'axios';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import FormData from 'form-data';

export const runtime = 'nodejs';

export async function DELETE(_req, { params }) {
    try {
        const { id } = params ?? {};
        if (!id) {
            return Response.json({ error: true, message: 'Missing id' }, { status: 400 });
        };

        const token = cookies().get('token')?.value;

        const headers = { Accept: 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = `${process.env.BASE_URL}/api/Product/${encodeURIComponent(id)}`;

        const res = await fetch(url, {
            method: 'DELETE',
            headers,
        });

        if (!res.ok) {
            let msg = '';
            try {
                const isJson = res.headers.get('content-type')?.includes('application/json');
                msg = isJson ? (await res.json())?.message : await res.text();
            } catch { /* pofig */ }
            return Response.json(
                { error: true, message: msg || `Backend error: ${res.status}` },
                { status: res.status }
            );
        }

        let data = null;
        if (res.status !== 204) {
            try {
                const isJson = res.headers.get('content-type')?.includes('application/json');
                data = isJson ? await res.json() : await res.text();
            } catch { /* тоже пофиг */ }
        }

        revalidateTag('products');

        return Response.json(data ?? { ok: true }, { status: 200 });
    } catch (err) {
        return Response.json({ error: true, message: err?.message || 'Unknown error' }, { status: 500 });
    };
};


export async function GET(req, { params }) {
    try {

        const { id } = params ?? {};
        if (!id) {
            return Response.json({ error: true, message: 'Missing id' }, { status: 400 });
        };

        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language") ?? "uz";

        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        const headers = { Accept: "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = new URL(`${process.env.BASE_URL}/api/Product/${encodeURIComponent(id)}`);
        url.searchParams.set("language", language);

        const res = await fetch(url.toString(), {
            method: "GET",
            headers,
            next: { revalidate: 600, tags: ["products"] },
        });

        if (!res.ok) {
            return Response.json(
                { error: true, message: `Backend error: ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data, { status: 200 });
    } catch (err) {
        console.error("Admin fetch error:", err);
        return Response.json({ error: true, message: err.message }, { status: 500 });
    };
};

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const inForm = await req.formData();

        const out = new FormData();

        const appendMany = (key, all) => (all || []).forEach(v => v != null && out.append(key, String(v)));

        const take = (k, def) => {
            const v = inForm.get(k);
            return v == null ? def : String(v);
        };

        out.append('Price', take('Price', ''));
        appendMany('Color', inForm.getAll('Color'));
        appendMany('Size', inForm.getAll('Size'));
        out.append('Category', take('Category', ''));

        const industry = inForm.get('Industry');
        if (industry) out.append('Industry', String(industry));

        out.append('Gender', take('Gender', 'men'));
        out.append('Discount', take('Discount', 'false'));
        out.append('NewPrice', take('NewPrice', '0'));

        appendMany('OldLinks', inForm.getAll('OldLinks'));

        const files = inForm.getAll('ImageLinks') || [];
        for (const f of files) {
            if (!f) continue;
            const buf = Buffer.from(await f.arrayBuffer());
            out.append('ImageLinks', buf, {
                filename: f.name || 'file',
                contentType: f.type || 'application/octet-stream',
            });
        }

        out.append('Language', take('Language', 'uz'));
        out.append('Name', take('Name', ''));
        out.append('Description', take('Description', ''));

        const hdrAuth = req.headers.get('authorization');
        const cookieToken = cookies().get('token')?.value;
        const Authorization = hdrAuth || (cookieToken ? `Bearer ${cookieToken}` : undefined);

        const url = `${process.env.BASE_URL}/api/Product/${encodeURIComponent(id)}`;
        const upstream = await axios.put(url, out, {
            headers: {
                ...(Authorization ? { Authorization } : {}),
                ...out.getHeaders(),
                Accept: '*/*',
            },
            maxBodyLength: Infinity,
            validateStatus: () => true,
        });

        if (upstream.status >= 400) {
            return new Response(JSON.stringify({ upstreamStatus: upstream.status, upstreamBody: upstream.data }), {
                status: upstream.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        revalidateTag('products');

        if (upstream.status === 204) {
            return new Response(JSON.stringify({ ok: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(upstream.data ?? { ok: true }), {
            status: upstream.status || 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        const status = err?.response?.status || 500;
        const body = err?.response?.data || err?.message || 'Unknown error';
        return new Response(JSON.stringify({ error: true, message: body }), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });
    };
};