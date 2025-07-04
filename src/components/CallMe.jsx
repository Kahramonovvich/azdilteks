'use client'
import { useMask } from "@react-input/mask";
import { toast } from "react-toastify";

export default function CallMe({ locale }) {
    const isUz = locale === 'uz';

    const inputPhoneRef = useMask({
        mask: '+998 __ ___ __ __',
        replacement: { _: /\d/ },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const phone = inputPhoneRef.current?.value;
        if (!phone || phone.includes('_')) {
            toast.warn(isUz ? "Telefon raqamingizni kiriting!" : "Введите номер телефона!");
            return;
        };
        toast.success(isUz ? "Tez orada aloqaga chiqamiz, kuting!" : "Мы скоро с вами свяжемся, пожалуйста, подождите!");
    };

    return (
        <div className="callMe mt-[60px]">
            <div className="container">
                <div className="box bg-[#F6F6F6] w-full py-[60px] rounded-3xl flex flex-col items-center">
                    <h3 className="text-5xl leading-[56px] text-center">
                        {isUz
                            ? "Hoziroq bog’laning chegirmaga ega bo’ling"
                            : "Свяжитесь с нами сейчас и получите скидку"}
                    </h3>
                    <p className={`mt-4 text-[#525252] text-center ${isUz ? 'max-w-[600px]' : ''}`}>
                        {isUz
                            ? "80+ ortiq buyurtma bersangiz chegirma va doimiy aksiyalarda ishtirok etish imkoniyati"
                            : "При заказе более 80 единиц — скидка и возможность участия в постоянных акциях"}
                    </p>
                    <form
                        className="flex gap-x-2 mt-12"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            ref={inputPhoneRef}
                            className="border outline-none rounded-3xl bg-transparent border-[#E5E5E5] p-4 w-[327px] font-medium text-sm leading-[22px] text-[#A3A3A3]"
                            placeholder="+998 99 999 99 99"
                        />
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