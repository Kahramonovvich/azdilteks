'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateAdminModal({ open, onClose, onSuccess, admin }) {

    if (!admin) return null;

    const [form, setForm] = useState({
        userName: '',
        oldUserName: '',
        password: '',
        oldPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const body = {
            oldUserName: form.oldUserName,
            oldPassword: form.oldPassword,
            newUserName: form.userName,
            newPassword: form.password,
        };

        try {
            const res = await axios.put('/api/Admin/updateAdmin', body);

            if (res.status >= 200 && res.status < 300) {
                toast.success('Admin o`zgartitildi.');
                onSuccess?.();
                onClose();
            };
        } catch (err) {
            console.error(err);
            toast.error("Xatolik:", err.status);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            oldUserName: admin?.userName ?? '',
        }));
    }, [admin, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Изменить админа</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="oldUserName"
                        placeholder="Старый логин"
                        value={form.oldUserName}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                        disabled
                    />
                    <input
                        type="text"
                        name="userName"
                        placeholder="Новый логин"
                        value={form.userName}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Старый пароль"
                        value={form.oldPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Новый пароль"
                        value={form.password}
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
};