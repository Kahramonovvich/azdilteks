import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function DELETE(_req, { params }) {
    try {
        const { id } = params;
        const token = cookies().get('token')?.value;

        const upstream = await fetch(
            `${process.env.BASE_URL}/api/Admin/delete?adminId=${id}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            }
        );

        const data = await upstream.json().catch(() => ({}));

        if (!upstream.ok) {
            return NextResponse.json(
                { error: true, message: data?.message || `Delete failed (${upstream.status})` },
                { status: upstream.status }
            );
        }

        revalidateTag('admins');

        return NextResponse.json({ ok: true, ...data }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: true, message: err?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}