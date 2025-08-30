'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import Image from 'next/image';

export default function ProductsTable({ locale }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/Product?language=${locale}`);
            if (!res.ok) throw new Error('Ошибка загрузки продуктов');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            toast.error('Не удалось загрузить продукты');
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAdd = () => {
        setOpenAddModal(true);
    };

    const handleEdit = (p) => {
        setOpenEditModal(true);
        setSelectedId(p.productId);
    };

    const handleDelete = async (id) => {
        if (!confirm('Удалить продукт?')) return;
        try {
            const res = await fetch(`/api/Product/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok || data?.error) throw new Error(data?.message || 'Ошибка удаления');
            toast.success('Продукт удалён');
            loadProducts();
        } catch (err) {
            toast.error(err.message);
        };
    };

    return (
        <div className="space-y-4">

            <AddProductModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSuccess={loadProducts}
            />
            <EditProductModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                productId={selectedId}
                onSuccess={loadProducts}
            />

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Продукты</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                    <Plus className="h-4 w-4" />
                    Добавить
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <colgroup>
                        <col className="w-[1%]" />
                        <col className="w-[1%]" />
                        <col className="w-[1%]" />
                        <col className="w-[1%]" />
                        <col />
                        <col className="w-[1%]" />
                    </colgroup>
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Картинка</th>
                            <th className="px-4 py-2">Название</th>
                            <th className="px-4 py-2">Цена</th>
                            <th className="px-4 py-2">Описание</th>
                            <th className="px-4 py-2 text-right">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    Загружается...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    Продуктов нет
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.productId} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap">{p.productId}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {p.imageLink ? (
                                            <div className="relative h-12 w-12">
                                                <Image
                                                    src={`/api/img?src=${encodeURIComponent(p.imageLink)}`}
                                                    alt={p.name}
                                                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                    loading='lazy'
                                                    fill
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">нет</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">{p.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{p.price.toLocaleString()} so‘m</td>
                                    <td className="px-4 py-2">
                                        <div
                                            className="line-clamp-2 break-words"
                                            title={p.description}
                                        >
                                            {p.description}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                                        >
                                            <Pencil className="h-4 w-4" /> Редакт
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.productId)}
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