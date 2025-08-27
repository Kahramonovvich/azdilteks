'use client'
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderComponent() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const newOrders = orders.filter(ord => Number(ord.status) === 1);
    const inProcessOrders = orders.filter(ord => Number(ord.status) === 2);
    const finishedOrders = orders.filter(ord => Number(ord.status) === 3);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/Cart`);
            if (!res.ok) throw new Error('Ошибка загрузки продуктов');
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
            toast.error('Не удалось загрузить продукты');
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        loadOrders();
    }, []);

    console.log(orders);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Заказы</h2>
                {/* <button
                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                    <Plus className="h-4 w-4" />
                    Добавить
                </button> */}
            </div>
            <div className="grid grid-cols-3 gap-x-5">
                <div className="new h-80 border-2">

                </div>
                <div className="inProcess h-80 border-2">

                </div>
                <div className="finished h-80 border-2">

                </div>
            </div>
        </div>
    );
};