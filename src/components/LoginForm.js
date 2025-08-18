'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {

    const router = useRouter();
    const [form, setForm] = useState({ userName: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.error) throw new Error(data?.message || 'Неверные данные');

            router.replace('/admin');
        } catch (e) {
            setErr(e.message || 'Ошибка входа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h1 className="mb-1 text-2xl font-semibold">Вход</h1>
            <p className="mb-6 text-sm text-gray-500">Введите логин и пароль</p>

            {err ? (
                <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {err}
                </div>
            ) : null}

            <label className="mb-1 block text-sm font-medium">Логин</label>
            <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                placeholder="userName"
                autoComplete="username"
            />

            <label className="mb-1 block text-sm font-medium">Пароль</label>
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="mb-6 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                placeholder="******"
                autoComplete="current-password"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-60"
            >
                {loading ? 'Входим…' : 'Войти'}
            </button>
        </form>
    );
};