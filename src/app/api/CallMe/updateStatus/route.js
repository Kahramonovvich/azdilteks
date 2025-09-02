import axios from 'axios';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const runtime = 'nodejs';

export async function PATCH(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const urlSearch = new URL(req.url).searchParams;

        const id = body?.id ?? urlSearch.get('id');
        const status = Number(body?.status ?? urlSearch.get('status') ?? 2);
        if (!id) {
            return new Response(JSON.stringify({ error: true, message: 'id required' }), {
                status: 400, headers: { 'Content-Type': 'application/json' },
            });
        }

        const token = cookies().get('token')?.value;

        const upstreamUrl = `${process.env.BASE_URL}/api/CallMe?callPhoneNumberId=${id}&status=${status}`;

        const upstream = await axios.patch(upstreamUrl, null, {
            headers: {
                Accept: 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            validateStatus: () => true,
        });

        if (upstream.status === 204) {
            revalidateTag('callMe');
            return Response.json({ ok: true }, { status: 200 });
        };

        if (upstream.status >= 400) {
            return new Response(
                JSON.stringify({ upstreamStatus: upstream.status, upstreamBody: upstream.data }),
                { status: upstream.status, headers: { 'Content-Type': 'application/json' } }
            );
        };

        revalidateTag('callMe');
        return new Response(JSON.stringify(upstream.data ?? { ok: true }), {
            status: upstream.status || 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        const status = err?.response?.status || 500;
        const message = err?.response?.data || err?.message || 'Unknown error';
        return new Response(JSON.stringify({ error: true, message }), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });
    };
};