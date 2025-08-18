'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddAdminModal({ open, onClose, onSuccess }) {
    const [form, setForm] = useState({
        fullName: '',
        userName: '',
        password: '',
        phoneNumber: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/Admin/create-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data?.message || 'Ошибка при создании');
            }

            toast.success('Админ успешно добавлен');
            onSuccess?.();
            onClose();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Добавить админа</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="ФИО"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <input
                        type="text"
                        name="userName"
                        placeholder="Логин"
                        value={form.userName}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                        >
                            {loading ? 'Сохраняем…' : 'Создать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}