'use client'
import ComIcon from '@/icons/comIcon.svg'
import LeftDownWildIcon from '@/icons/left down wide.svg'
import LeftTopWildIcon from '@/icons/left top wide.svg'
import Image from 'next/image';
import SunIcon from '@/icons/sun.svg'

export default function Comments({ locale }) {
    const isUz = locale === 'uz';

    const comments = isUz ? [
        {
            comment: "Biz Az & Dil Textile bilan 3 yildan beri ishlaymiz. Ularning matolari sifati va xizmat ko'rsatish darajasi doimo yuqori bo'lib kelmoqda.",
            name: 'Umid Rustamov - Umid restorani'
        },
        {
            comment: "Individual buyurtmalarimizni har doim o'z vaqtida va yuqori sifatda bajarishadi. Ishonchli hamkor sifatida tavsiya qilaman.",
            name: 'Jaxongir Ahmedov - Az & Del korxonasi'
        },
        {
            comment: "Az & Dil Textile bilan hamkorlik qilish juda qulay. Sifatli mahsulotlar va o'z vaqtida yetkazib berish bizning ishimizni ancha osonlashtirdi.",
            name: 'Jaxongir Ahmedov - Elegant Maktabi'
        },
    ] : [
        {
            comment: "Мы работаем с Az & Dil Textile уже 3 года. Качество тканей и уровень сервиса всегда на высоте.",
            name: 'Умид Рустамов - ресторан Umid'
        },
        {
            comment: "Все индивидуальные заказы всегда выполняются вовремя и на высоком уровне. Рекомендую как надёжного партнёра.",
            name: 'Жахонгир Ахмедов - компания Az & Del'
        },
        {
            comment: "Сотрудничество с Az & Dil Textile — это удобно. Качественная продукция и своевременная доставка упростили нам работу.",
            name: 'Жахонгир Ахмедов - школа Elegant'
        },
    ];

    return (
        <div className="comments mt-[90px]">
            <div className="container">
                <div className="top text-center">
                    <h3 className="text-5xl leading-[56px]">
                        {isUz ? 'Mijozlar nima deydi?' : 'Что говорят клиенты?'}
                    </h3>
                    <p className="mt-4 text-[#525252]">
                        {isUz ? '100+ ortiq mamnun mijozlar ular nima deydi' : 'Более 100 довольных клиентов делятся своими отзывами'}
                    </p>
                </div>

                <div className="bottom mt-14 grid grid-cols-3 gap-x-6">
                    {comments.map((item, index) => (
                        <div
                            key={index}
                            className="box border p-6 rounded-3xl flex flex-col gap-y-6"
                        >
                            <ComIcon />
                            <p className='text-lg leading-[26px]'>
                                {item.comment}
                            </p>
                            <p className='font-medium mt-auto'>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="box mt-[90px]">
                <div className="container">
                    <div className="bottom grid grid-cols-12 gap-6">
                        <div className="rightBottom bg-primary-orange col-span-5 rounded-3xl p-8 pb-[104px] text-[#E2DBCB]">
                            <SunIcon />
                            <div className="text mt-[72px]">
                                <p className='text-[60px] leading-[72px]'>
                                    <span className=''>
                                        {isUz ? 'Doimiy mijozlar' : 'Постоянным клиентам'}
                                    </span>
                                    <br />
                                    <span className="text-nowrap">
                                        {isUz ? 'uchun chegirma' : 'скидка'}
                                    </span>
                                </p>
                                <p className='font-medium mt-3'>
                                    {isUz
                                        ? '80+ ortiq buyurtma bersangiz chegirma va doimiy aksiyalarda ishtirok etish imkoniyati'
                                        : 'При заказе более 80 единиц — скидка и участие в постоянных акциях'}
                                </p>
                            </div>
                        </div>

                        <div className="left col-span-7 bg-[#F6F6F6] rounded-3xl pt-10 pl-8 relative flex gap-x-2">
                            <div className="absolute bottom-0 left-0">
                                <LeftDownWildIcon />
                            </div>
                            <div className="absolute top-3 right-0">
                                <LeftTopWildIcon />
                            </div>
                            <div className="text max-w-[340px]">
                                <h3 className="text-[54px] leading-[72px]">
                                    {isUz
                                        ? '15dan ortiq namunalar eng yaxshisi siz uchun'
                                        : 'Более 15 образцов — выберите лучшее для себя'}
                                </h3>
                            </div>
                            <div className="img relative aspect-[0.59] max-w-[280px]">
                                <Image
                                    fill
                                    src={'/images/aboutImg.png'}
                                    alt='Biz haqimizda'
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};