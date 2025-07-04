'use client'
import RotateIcon from '@/icons/refresh-rotate.svg'
import SecurityIcon from '@/icons/shield-chekmark.svg'
import TruckIcon from '@/icons/truck-2.svg'

export default function OurServices({ locale }) {
    const isUz = locale === 'uz';

    const info = [
        {
            icon: <RotateIcon />,
            title: isUz ? 'Bepul qaytish' : 'Бесплатный возврат',
            subTitle: isUz
                ? 'Mijozlarimiz xaridlarini oson va muammosiz qaytarish yoki almashtirishlari mumkin.'
                : 'Наши клиенты могут легко и без проблем вернуть или обменять свои покупки.',
        },
        {
            icon: <SecurityIcon />,
            title: isUz ? 'Xavfsiz toʻlov' : 'Безопасная оплата',
            subTitle: isUz
                ? 'Toʻlov jarayonlari xavfsiz va himoyalangan.'
                : 'Ваши платежи надёжно защищены и обрабатываются безопасно.',
        },
        {
            icon: <TruckIcon />,
            title: isUz ? 'Vaqtida yetkazish' : 'Своевременная доставка',
            subTitle: isUz
                ? 'Buyurtmalaringiz o‘z vaqtida yetkaziladi, vaʼda beramiz.'
                : 'Мы гарантируем, что ваш заказ будет доставлен в срок.',
        },
    ];

    return (
        <div className="ourServices mt-[90px]">
            <div className="container">
                <div className="grid grid-cols-4 gap-x-6">
                    <div className="box">
                        <h3 className="text-5xl leading-[56px]">
                            {isUz ? 'Bizning xizmatlarimiz' : 'Наши услуги'}
                        </h3>
                        <p className="font-medium text-[#525252] mt-4">
                            {isUz
                                ? 'Biz uzluksiz va yoqimli xarid qilish tajribasi muhimligini tushunamiz.'
                                : 'Мы понимаем, насколько важен приятный и беспроблемный опыт покупок.'}
                        </p>
                    </div>
                    {info.map((item, index) => (
                        <div
                            key={index}
                            className="box border rounded-3xl p-4 flex flex-col gap-y-3"
                        >
                            {item.icon}
                            <p className='text-2xl'>
                                {item.title}
                            </p>
                            <p className='text-[#525252]'>
                                {item.subTitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
