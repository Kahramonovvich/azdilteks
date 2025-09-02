'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { Modal } from "@mui/material";
import CloseIcon from '@/icons/x 1.svg'
import { toast } from "react-toastify";
import { useState } from "react";
import { cleanPhone, normalizeLocal } from "@/utils/utils";
import axios from "axios";

export default function OrderModal({ totalPrice }) {

    const { orderModal, setOrderModal, setCart, cart } = useGlobalContext();

    if (!orderModal) {
        return null;
    };

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const handleClose = () => {
        if (isLoading) {
            return;
        };
        setOrderModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsloading(true);

        const ord = cart
            .filter(o => o.isChecked)
            .map(o => ({
                productId: o.id,
                size: o.selectedOptions.size,
                color: o.selectedOptions.color,
                quantity: o.quantity,
            }));

        const sendedOrders = {
            user: {
                name: name,
                birthDate: birthDate ? new Date(birthDate).toISOString() : new Date().toISOString(),
                phoneNumber: cleanPhone(phoneNumber)
            },
            orders: ord,
            totalPrice: totalPrice
        };

        try {
            const res = await axios.post('/api/Cart/create', sendedOrders, {
                headers: { 'Content-Type': 'application/json' },
                validateStatus: () => true,
            });

            if (res.status >= 200 && res.status < 300) {
                setOrderModal(false);
                setCart([]);
                toast.success("Buyurtma muvofaqqiyatli jo`natildi!");
            } else {
                toast.error('Buyurtma berishda xatolik.')
            };
        } catch (error) {
            console.error(error);
            toast.error('Buyurtma berishda xatolik.')
        } finally {
            setIsloading(false);
        };
    };

    return (
        <Modal
            open={orderModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="px-4 lg:p-0"
        >
            <div className="relative w-full h-full">
                <div className="box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[30px] lg:p-10 p-3 lg:w-[456px] w-full">
                    <div className="top flex items-center justify-between py-1.5">
                        <p className="font-bold text-2xl">
                            Qabul qiluvchi:
                        </p>
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="border-t my-3"></div>
                    <form
                        className="flex flex-col gap-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Ismingiz
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="p-4 border rounded-lg text-sm leading-[22px] text-[#A3A3A3] font-medium outline-none"
                                placeholder="Murodjon"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="birthDate"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Tug’ilgan kun
                            </label>
                            <input
                                type='date'
                                id="birthDate"
                                className="p-4 border rounded-lg text-sm leading-[22px] text-[#A3A3A3] font-medium outline-none w-full"
                                placeholder="Tug’ilgan kuningiz"
                                onChange={(e) => setBirthDate(e.target.value)}
                                value={birthDate}
                            />
                        </div>
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="phoneNumber"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Telefon raqam
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="p-4 border text-sm font-bold rounded-lg bg-gray-100 text-gray-700">+998</span>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    className="flex-1 p-4 border rounded-lg text-sm outline-none"
                                    required
                                    onChange={(e) => setPhoneNumber(normalizeLocal(e.target.value))}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const t = e.clipboardData.getData('text') || '';
                                        setPhoneNumber(normalizeLocal(t));
                                    }}
                                    value={phoneNumber}
                                />
                            </div>

                        </div>
                        <div className="btnBox flex flex-col gap-y-[18px] mt-0.5">
                            <button
                                className="rounded-3xl p-4 bg-primary-orange text-white font-medium"
                                type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? "Jo'natilmoqda" : "Jo’natish"}
                            </button>
                            <button
                                className="rounded-3xl p-4 border border-primary-orange text-primary-orange font-medium"
                                type="button"
                                onClick={handleClose}
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};