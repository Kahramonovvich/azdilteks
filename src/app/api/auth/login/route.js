import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json(); 

        const upstream = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        const data = await upstream.json().catch(() => ({}));

        if (!upstream.ok) {
            const message = data?.message || `Login failed (${upstream.status})`;
            return NextResponse.json({ error: true, message }, { status: upstream.status });
        }

        const token =
            data?.token || data?.accessToken || data?.jwt || data?.result?.token;

        if (!token) {
            return NextResponse.json(
                { error: true, message: 'Токен не получен от бэкенда' },
                { status: 500 }
            );
        }

        const res = NextResponse.json({ ok: true });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return res;
    } catch (err) {
        return NextResponse.json(
            { error: true, message: err?.message || 'Unknown error' },
            { status: 500 }
        );
    };
};