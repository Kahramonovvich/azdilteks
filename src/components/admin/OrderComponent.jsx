'use client'
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderComponent({ locale }) {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const newOrders = orders.filter(ord => Number(ord.status) === 1) || [];
    const inProcessOrders = orders.filter(ord => Number(ord.status) === 2) || [];
    const finishedOrders = orders.filter(ord => Number(ord.status) === 3) || [];

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

    const totalQty = (prd) => {
        const tQty = prd?.reduce((sum, p) => sum + p.quantity, 0);
        return tQty;
    };

    const handleUpdateOrder = async (id, sts) => {
        setLoading(true);

        try {
            const res = await axios.put(`/api/Cart/UpdateCart/${id}`, { status: sts });
            if (res.status >= 200 && res.status < 300) {
                toast.success('Buyurtma statusi o`zgartirildi.');
                loadOrders();
            };
        } catch (error) {
            toast.error(`Xatolik: ${error.status}`);
            console.error(error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        loadOrders();
        loadProducts();
    }, []);

    return (
        <div className="grid grid-cols-3">
            {loading && (
                <div className="loader fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-gray-300 bg-opacity-20">
                    <CircularProgress />
                </div>
            )}
            <div className="new border-l-2 border-black border-b-2 rounded-s-lg overflow-hidden">
                <div className="box border-y-2 w-full border-black py-2 bg-green-500 text-white">
                    <h3 className="text-center text-xl font-semibold">
                        Yangi {newOrders.length}
                    </h3>
                </div>
                {newOrders?.map((order) => (
                    <div
                        key={order.cartId}
                        className="info m-3 p-2 bg-gray-200 rounded-md"
                    >
                        <p className="text-lg font-medium">
                            Buyurtma raqami: <span className="font-semibold">{order.cartId}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mijoz: <span className="font-semibold">{order.name}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mahsulotlar soni: <span className="font-semibold">{totalQty(order?.products)}</span>
                        </p>
                        <div className="btnBox flex items-center justify-between mt-3">
                            <button className="font-medium rounded-md bg-green-400 text-white px-2 py-1">
                                Batafsil
                            </button>
                            <button
                                className="font-medium rounded-md bg-orange-400 text-white px-2 py-1"
                                onClick={() => handleUpdateOrder(order.cartId, 2)}
                                disabled={loading}
                            >
                                Qabul qilindi
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="inProcess border-l-2 border-black border-b-2">
                <div className="box border-y-2 w-full border-black py-2 bg-yellow-500 text-white">
                    <h3 className="text-center text-xl font-semibold">
                        Jarayonda {inProcessOrders.length}
                    </h3>
                </div>
                {inProcessOrders?.map((order) => (
                    <div
                        key={order.cartId}
                        className="info my-3 mx-3 p-2 bg-gray-200 rounded-md"
                    >
                        <p className="text-lg font-medium">
                            Buyurtma raqami: <span className="font-semibold">{order.cartId}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mijoz: <span className="font-semibold">{order.name}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mahsulotlar soni: <span className="font-semibold">{totalQty(order?.products)}</span>
                        </p>
                        <div className="btnBox flex items-center justify-between mt-3">
                            <button className="font-medium rounded-md bg-green-400 text-white px-2 py-1">
                                Batafsil
                            </button>
                            <button
                                className="font-medium rounded-md bg-orange-400 text-white px-2 py-1"
                                onClick={() => handleUpdateOrder(order.cartId, 3)}
                                disabled={loading}
                            >
                                Yakunlandi
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="finished border-x-2 border-black border-b-2 rounded-e-lg overflow-hidden">
                <div className="box border-y-2 w-full border-black py-2 bg-gray-500 text-white">
                    <h3 className="text-center text-xl font-semibold">
                        Tugadi {finishedOrders.length}
                    </h3>
                </div>
                {finishedOrders?.map((order) => (
                    <div
                        key={order.cartId}
                        className="info my-3 mx-3 p-2 bg-gray-200 rounded-md"
                        // onClick={() => handleUpdateOrder(order.cartId, 1)}
                    >
                        <p className="text-lg font-medium">
                            Buyurtma raqami: <span className="font-semibold">{order.cartId}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mijoz: <span className="font-semibold">{order.name}</span>
                        </p>
                        <p className="text-lg font-medium">
                            Mahsulotlar soni: <span className="font-semibold">{totalQty(order?.products)}</span>
                        </p>
                        <div className="btnBox flex items-center justify-between mt-3">
                            <button className="font-medium rounded-md bg-green-400 text-white px-2 py-1">
                                Batafsil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};