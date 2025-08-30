import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function PUT(req, { params }) {

    try {
        const { id } = params;
        const body = await req.json();
        const token = cookies().get('token')?.value;

        const { data, status } = await axios.put(`${process.env.BASE_URL}/api/Cart/UpdateCart/${id}`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            validateStatus: () => true,
        });

        if (status === 204) {
            revalidateTag('orders');
            return Response.json({ ok: true }, { status: 200 });
        };

        if (status >= 200 && status < 300) {
            revalidateTag('orders');
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