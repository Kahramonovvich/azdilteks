import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export async function DELETE(_req, { params }) {
    try {
        const { id } = params ?? {};
        if (!id) {
            return Response.json({ error: true, message: 'Missing id' }, { status: 400 });
        }

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
    }
}