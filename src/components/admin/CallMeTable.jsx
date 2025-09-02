'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CallMeTable({ locale = 'uz' }) {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState({}); // { [id]: true }

    const loadPhones = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/CallMe/getAll', { headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(`Load error ${res.status}`);
            const data = await res.json();
            setPhones(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            toast.error(e.message || 'Yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadPhones(); }, []);

    const yeni = useMemo(
        () => phones.filter(p => Number(p.status) === 1).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [phones]
    );
    const qilingan = useMemo(
        () => phones.filter(p => Number(p.status) === 2).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [phones]
    );

    const markCalled = async (row) => {
        const id = row.callPhoneNumberId ?? row.id;
        if (!id) return;

        setUpdating(s => ({ ...s, [id]: true }));
        setPhones(prev => prev.map(x => x.callPhoneNumberId === id ? { ...x, status: 2 } : x));

        try {
            await axios.patch('/api/CallMe/updateStatus', { id, status: 2 });
            toast.success("Holati o'zgartirildi");
        } catch (e) {
            setPhones(prev => prev.map(x => x.callPhoneNumberId === id ? { ...x, status: row.status } : x));
            toast.error(e?.response?.data?.message || e.message || 'Yangilashda xatolik');
        } finally {
            setUpdating(s => {
                const n = { ...s };
                delete n[id];
                return n;
            });
        };
    };

    const fmtTime = (iso) => {
        if (!iso) return '-';
        try {
            return new Date(iso).toLocaleString(locale);
        } catch { return iso; }
    };

    return (
        <div className="">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Qo'ng'iroq uchun raqamlar</h2>
                <button
                    onClick={loadPhones}
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                    disabled={loading}
                >
                    {loading ? 'Yuklanmoqda…' : 'Yangilash'}
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                    <div className="mb-3 text-center text-base font-semibold">Yangi</div>
                    <div className="divide-y">
                        {yeni.length === 0 && (
                            <div className="py-6 text-center text-sm text-gray-500">Bo'sh</div>
                        )}
                        {yeni.map((row) => (
                            <div key={row.callPhoneNumberId} className="flex items-center justify-between gap-3 py-3">
                                <div>
                                    <div className="font-medium">{row.phoneNumber}</div>
                                    <div className="text-xs text-gray-500">{fmtTime(row.createdAt)}</div>
                                </div>
                                <button
                                    onClick={() => markCalled(row)}
                                    disabled={!!updating[row.callPhoneNumberId]}
                                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
                                >
                                    {updating[row.callPhoneNumberId] ? 'Saqlanmoqda…' : "Qo'ng'iroq qilindi"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <div className="mb-3 text-center text-base font-semibold">Qo'ng'iroq qilingan</div>
                    <div className="divide-y">
                        {qilingan.length === 0 && (
                            <div className="py-6 text-center text-sm text-gray-500">Bo'sh</div>
                        )}
                        {qilingan.map((row) => (
                            <div key={row.callPhoneNumberId} className="flex items-center justify-between gap-3 py-3">
                                <div>
                                    <div className="font-medium">{row.phoneNumber}</div>
                                    <div className="text-xs text-gray-500">{fmtTime(row.createdAt)}</div>
                                </div>
                                <span className="rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-700">Qo'ng'riq qlingan</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};