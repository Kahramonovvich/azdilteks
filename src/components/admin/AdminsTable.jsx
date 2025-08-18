'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import AddAdminModal from './AddAdminModal';

export default function AdminsTable() {

    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    // загрузка админов
    const loadAdmins = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/Admin/getAdmins');
            if (!res.ok) throw new Error('Ошибка загрузки');
            const data = await res.json();
            setAdmins(data);
        } catch (err) {
            console.error(err);
            toast.error('Не удалось загрузить админов');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    const handleAdd = () => {
        setOpenAdd(true);
    };

    const handleEdit = (admin) => {
        toast.info(`Редактировать: ${admin.fullName}`);
    };

    const handleDelete = async (adminId) => {
        if (!confirm('Удалить этого админа?')) return;
        try {
            const res = await fetch(`/api/Admin/delete/${adminId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Ошибка при удалении');
            toast.success('Админ удалён');
            loadAdmins();
        } catch (err) {
            console.error(err);
            toast.error('Ошибка при удалении');
        }
    };

    return (
        <div className="space-y-4">

            <AddAdminModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSuccess={loadAdmins}
            />

            {/* Заголовок и кнопка добавить */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Администраторы</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                    <Plus className="h-4 w-4" />
                    Добавить
                </button>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">ФИО</th>
                            <th className="px-4 py-2">Логин</th>
                            <th className="px-4 py-2">Телефон</th>
                            <th className="px-4 py-2 text-right">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                    Загружается...
                                </td>
                            </tr>
                        ) : admins.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                    Администраторов нет
                                </td>
                            </tr>
                        ) : (
                            admins.map((a) => (
                                <tr key={a.adminId} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{a.adminId}</td>
                                    <td className="px-4 py-2">{a.fullName}</td>
                                    <td className="px-4 py-2">{a.userName}</td>
                                    <td className="px-4 py-2">{a.phoneNumber}</td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(a)}
                                            className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                                        >
                                            <Pencil className="h-4 w-4" /> Редакт
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a.adminId)}
                                            className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" /> Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};