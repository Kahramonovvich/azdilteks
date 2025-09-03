'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { Modal } from "@mui/material";
import CloseIcon from '@/icons/x 1.svg'

export default function CallBackModal({ locale }) {

    const { callBackModal, setCallBackModal } = useGlobalContext();

    const handleClose = () => setCallBackModal(false);

    const text = {
        uz: [
            {
                title: "Vaqtingizni kutishga sarflamang — o‘zingiz qo‘ng‘iroq qiling!",
                subTitle: "Biz har doim qo‘ng‘iroqlaringizga xursand bo‘lamiz va barcha savollaringizga batafsil javob beramiz."
            },
            {
                title: "Mahsulot va xizmatlarimiz haqida bilmoqchimisiz?",
                subTitle: "Mutaxassislarimiz hammasini tushuntirib beradi, tanlovingizda yordam qiladi va aynan siz uchun eng yaxshi yechimni tavsiya qiladi."
            },
            {
                title: "Buyurtma yoki yetkazib berishda yordam kerakmi?",
                subTitle: "Biz har bir bosqichni izohlab beramiz va xarid jarayonini siz uchun iloji boricha qulay va oddiy qilamiz."
            },
        ],
        ru: [
            {
                title: 'Не тратьте время на ожидание — звоните нам сами!',
                subTitle: 'Мы всегда рады вашим звонкам и готовы подробно ответить на все вопросы.'
            },
            {
                title: 'Хотите узнать о наших товарах и услугах?',
                subTitle: 'Наши специалисты расскажут всё в деталях, помогут разобраться с выбором и подскажут лучшие решения именно для вас.'
            },
            {
                title: 'Нужна помощь с заказом или доставкой?',
                subTitle: 'Мы объясним каждый шаг и сделаем так, чтобы покупки у нас были максимально удобными и простыми.'
            },
        ]
    };

    return (
        <Modal
            open={callBackModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="px-4 lg:p-0"
        >
            <div className="relative w-full h-full">
                <div className="box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[30px] lg:p-10 p-3 w-full lg:w-[500px]">
                    <div className="top flex items-center justify-between py-1.5">
                        <p className="font-bold text-2xl">
                            Bog’lanish
                        </p>
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="border-t my-3"></div>
                    <div className="flex flex-col gap-y-3">
                        {text[locale].map((t, idx) => (
                            <div
                                className="box"
                                key={idx}
                            >
                                <p className="text-lg font-semibold">
                                    {t.title}
                                </p>
                                <p className="font-medium text-sm mt-2">
                                    {t.subTitle}
                                </p>
                            </div>
                        ))}
                        <p className="text-sm font-medium">
                            {locale === 'uz' ?
                                'Hoziroq qo‘ng‘iroq qiling — va kerakli barcha ma’lumotni tez, qulay va kutmasdan oling!' :
                                'Позвоните прямо сейчас — и получите всю нужную информацию быстро, удобно и без лишних ожиданий!'
                            }
                        </p>
                    </div>
                    <div className="btnBox grid grid-cols-2 items-center gap-x-3 mt-5">
                        <p
                            className="font-semibol text-center"
                        >
                            +998 (93) 358-22-20
                        </p>
                        <a
                            href="tel:+998933582220"
                            className="font-semibol text-white text-center rounded-xl p-3 bg-primary-orange"
                        >
                            Qong'iroq qilish
                        </a>
                    </div>
                </div>
            </div>
        </Modal>
    );
};