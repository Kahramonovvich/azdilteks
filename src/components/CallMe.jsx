'use client'
import { cleanPhone, normalizeLocal } from "@/utils/utils";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CallMe({ locale }) {

    const isUz = locale === 'uz';

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneNumber.length < 14) {
            toast.warn("Telefon raqamingizni to'liq kiriting!");
            return;
        };

        try {
            const res = await axios.post('/api/CallMe/create',
                { phoneNumber: cleanPhone(phoneNumber) }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status >= 200 && res.status < 300) {
                toast.success(isUz ? "Tez orada aloqaga chiqamiz, kuting!" : "Мы скоро с вами свяжемся, пожалуйста, подождите!");
                setPhoneNumber('');
            };
        } catch (e) {
            console.error(e);
            toast.error("Jo'natishda xatolik. Iltimos keyinroq urinib ko'ring.");
        };
    };

    return (
        <div className="callMe lg:mt-[60px] mt-5">
            <div className="container">
                <div className="box bg-[#F6F6F6] w-full lg:py-[60px] lg:px-0 p-5 rounded-3xl flex flex-col items-center">
                    <h3 className="lg:text-5xl text-2xl lg:leading-[56px] text-center font-semibold lg:font-normal">
                        {isUz
                            ? "Hoziroq bog’laning chegirmaga ega bo’ling"
                            : "Свяжитесь с нами сейчас и получите скидку"}
                    </h3>
                    <p className={`lg:mt-4 mt-2 text-[#525252] text-center ${isUz ? 'lg:max-w-[600px]' : ''}`}>
                        {isUz
                            ? "80+ ortiq buyurtma bersangiz chegirma va doimiy aksiyalarda ishtirok etish imkoniyati"
                            : "При заказе более 80 единиц — скидка и возможность участия в постоянных акциях"}
                    </p>
                    <form
                        className="flex gap-2 lg:mt-12 mt-4 flex-col lg:flex-row"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex items-center">
                            <label className="p-4 border border-gray-300 rounded-r-none bg-gray-300 rounded-3xl font-medium text-sm leading-[22px]">+998</label>
                            <input
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                required
                                className="border outline-none rounded-3xl rounded-l-none border-l-0 bg-transparent border-[#E5E5E5] p-4 w-[327px] font-medium text-sm leading-[22px] text-[#A3A3A3]"
                                onChange={(e) => setPhoneNumber(normalizeLocal(e.target.value))}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const t = e.clipboardData.getData('text') || '';
                                    setPhoneNumber(normalizeLocal(t));
                                }}
                                placeholder="(99) 999-99-99"
                                value={phoneNumber}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary-orange py-4 px-10 rounded-3xl text-white font-medium"
                        >
                            {isUz ? "Yuborish" : "Отправить"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};