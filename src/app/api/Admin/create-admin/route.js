import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const body = await req.json();
        const token = cookies().get('token')?.value;

        const res = await fetch(`${process.env.BASE_URL}/api/Admin/create-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return Response.json(
                { error: true, message: data?.message || 'Ошибка при создании' },
                { status: res.status }
            );
        }

        revalidateTag('admins');

        return Response.json(data, { status: 201 });
    } catch (err) {
        return Response.json({ error: true, message: err.message }, { status: 500 });
    }
}