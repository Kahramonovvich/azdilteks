'use client'
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderComponent({ locale }) {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
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
        loadOrders();
        loadProducts();
    }, []);

    return (
        <div className="space-y-4">
            {/* <div className="flex items-center justify-between"> */}
            {/* <h2 className="text-xl font-bold">Заказы</h2> */}
            {/* <button
                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                    <Plus className="h-4 w-4" />
                    Добавить
                </button> */}
            {/* </div> */}
            <div className="grid grid-cols-3">
                <div className="new border-l-2 border-black border-b-2 rounded-s-lg overflow-hidden">
                    <div className="box border-y-2 w-full border-black py-2 bg-green-500 text-white">
                        <h3 className="text-center text-xl font-semibold">
                            Yangi (13)
                        </h3>
                    </div>
                    <div className="info my-3 mx-3 p-2 bg-gray-200 rounded-md">
                        <p className="text-lg font-medium">
                            Buyurtma raqami: <span className="font-semibold">3254</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mijoz: <span className="font-semibold">Furqat</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mahsulotlar soni: <span className="font-semibold">13</span>
                        </p>
                        <div className="btnBox flex items-center justify-between mt-3">
                            <button className="font-medium rounded-md bg-green-400 text-white px-2 py-1">
                                Batafsil
                            </button>
                            <button className="font-medium rounded-md bg-orange-400 text-white px-2 py-1">
                                Qabul qilindi
                            </button>
                        </div>
                    </div>
                </div>
                <div className="inProcess border-l-2 border-black border-b-2">
                    <div className="box border-y-2 w-full border-black py-2 bg-yellow-500 text-white">
                        <h3 className="text-center text-xl font-semibold">
                            Jarayonda
                        </h3>
                    </div>
                </div>
                <div className="finished border-x-2 border-black border-b-2 rounded-e-lg overflow-hidden">
                    <div className="box border-y-2 w-full border-black py-2 bg-gray-500 text-white">
                        <h3 className="text-center text-xl font-semibold">
                            Tugadi
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};