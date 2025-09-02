'use client'
import RotateIcon from '@/icons/refresh-rotate.svg'
import SecurityIcon from '@/icons/shield-chekmark.svg'
import TruckIcon from '@/icons/truck-2.svg'

export default function OurServices({ locale }) {
    const isUz = locale === 'uz';

    const info = [
        {
            icon: <RotateIcon className='w-10 h-10 lg:w-16 lg:h-16' />,
            title: isUz ? 'Bepul konsultatsiya va o‘lcham olish' : 'Бесплатная консультация и замер',
            subTitle: isUz
                ? 'Biz bilan hamkorlik qilishni yanada qulay qiling. Mutaxassislarimiz siz uchun eng to‘g‘ri yechimni tanlab, kerakli o‘lchamlarni joyida aniqlab berishadi.'
                : 'Сделайте сотрудничество с нами ещё удобнее. Наши специалисты подберут для вас оптимальное решение и определят необходимые размеры на объекте.',
        },
        {
            icon: <SecurityIcon className='w-10 h-10 lg:w-16 lg:h-16' />,
            title: isUz ? 'Xavfsiz toʻlov' : 'Безопасная оплата',
            subTitle: isUz
                ? 'Toʻlov jarayonlari xavfsiz va himoyalangan.'
                : 'Ваши платежи надёжно защищены и обрабатываются безопасно.',
        },
        {
            icon: <TruckIcon className='w-10 h-10 lg:w-16 lg:h-16' />,
            title: isUz ? 'Vaqtida yetkazish' : 'Своевременная доставка',
            subTitle: isUz
                ? 'Buyurtmalaringiz o‘z vaqtida yetkaziladi, vaʼda beramiz.'
                : 'Мы гарантируем, что ваш заказ будет доставлен в срок.',
        },
    ];

    return (
        <div className="ourServices lg:mt-[90px] mt-5">
            <div className="container">
                <div className="grid grid-cols-4 lg:gap-x-6 gap-3">
                    <div className="box col-span-4 lg:col-span-1">
                        <h3 className="lg:text-5xl lg:leading-[56px] text-2xl">
                            {isUz ? 'Bizning xizmatlarimiz' : 'Наши услуги'}
                        </h3>
                        <p className="font-medium text-[#525252] lg:mt-4 mt-1">
                            {isUz
                                ? 'Biz uzluksiz va yoqimli xarid qilish tajribasi muhimligini tushunamiz.'
                                : 'Мы понимаем, насколько важен приятный и беспроблемный опыт покупок.'}
                        </p>
                    </div>
                    {info.map((item, index) => (
                        <div
                            key={index}
                            className="box border rounded-3xl p-4 flex flex-col gap-y-3 lg:col-span-1 col-span-4"
                        >
                            <div className="flex items-center gap-x-2 lg:block">
                                {item.icon}
                                <p className='lg:text-2xl text-lg'>
                                    {item.title}
                                </p>
                            </div>
                            <p className='text-[#525252] text-sm lg:text-base'>
                                {item.subTitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};