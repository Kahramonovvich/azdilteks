import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
    headers: { Accept: 'application/json' },
});

export async function POST(req) {

    try {
        const body = await req.json();
        const token = cookies().get('token')?.value;

        const { data, status } = await api.post('/api/CallMe', body, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            validateStatus: () => true,
        });

        if (status >= 200 && status < 300) {
            revalidateTag('callMe');
            return Response.json(data ?? { ok: true }, { status });
        };

        return Response.json(
            {
                error: true,
                message: data?.message || 'Ошибка при создании',
                details: typeof data === 'object' ? data : { raw: data },
            },
            { status }
        );
    } catch (err) {
        const status = err?.response?.status || 500;
        const data = err?.response?.data;
        const message =
            (typeof data === 'object' && (data.message || data.error)) ||
            err?.message ||
            'Неизвестная ошибка';

        return Response.json(
            {
                error: true,
                message,
                details: typeof data === 'object' ? data : { raw: data },
            },
            { status }
        );
    };
};