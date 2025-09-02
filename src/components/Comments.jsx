'use client'
import ComIcon from '@/icons/comIcon.svg'
import LeftDownWildIcon from '@/icons/left down wide.svg'
import LeftTopWildIcon from '@/icons/left top wide.svg'
import Image from 'next/image';
import SunIcon from '@/icons/sun.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'

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

    const slides = [...comments, ...comments, ...comments]

    return (
        <div className="comments lg:mt-[90px] mt-5">
            <div className="container">
                <div className="top text-center">
                    <h3 className="lg:text-5xl lg:leading-[56px] text-2xl">
                        {isUz ? 'Mijozlar nima deydi?' : 'Что говорят клиенты?'}
                    </h3>
                    <p className="lg:mt-4 mt-1 text-[#525252] text-sm">
                        {isUz ? '100+ ortiq mamnun mijozlar ular nima deydi' : 'Более 100 довольных клиентов делятся своими отзывами'}
                    </p>
                </div>

                <div className="bottom lg:mt-14 mt-3">
                    <Swiper
                        modules={[Autoplay]}
                        loop
                        speed={300}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        allowTouchMove={false}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 12 },
                            640: { slidesPerView: 1, spaceBetween: 16 },
                            768: { slidesPerView: 1, spaceBetween: 20 },
                            1024: { slidesPerView: 2, spaceBetween: 24 },
                            1280: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        loopAdditionalSlides={slides.length}
                    >
                        {slides.map((item, index) => (
                            <SwiperSlide
                                key={index}
                            >
                                <div
                                    className="box border lg:p-6 p-3 rounded-3xl flex flex-col lg:gap-y-6 gap-y-3"
                                >
                                    <ComIcon />
                                    <p className='lg:text-lg lg:leading-[26px]'>
                                        {item.comment}
                                    </p>
                                    <p className='font-medium mt-auto'>
                                        {item.name}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className="box lg:mt-[90px] mt-5">
                <div className="container">
                    <div className="bottom grid grid-cols-12 lg:gap-6 gap-3">
                        <div className="rightBottom bg-primary-orange lg:col-span-5 col-span-12 rounded-3xl lg:p-8 lg:pb-[104px] p-3 text-[#E2DBCB]">
                            <SunIcon />
                            <div className="text lg:mt-[72px] mt-3">
                                <p className='lg:text-[60px] lg:leading-[72px] text-3xl'>
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

                        <div className="left lg:col-span-7 col-span-12 bg-[#F6F6F6] rounded-3xl lg:pt-10 lg:pl-8 p-3 relative flex gap-x-2">
                            <div className="absolute bottom-0 left-0 hidden lg:block">
                                <LeftDownWildIcon />
                            </div>
                            <div className="absolute top-3 right-0 hidden lg:block">
                                <LeftTopWildIcon />
                            </div>
                            <div className="text lg:max-w-[340px]">
                                <h3 className="lg:text-[54px] lg:leading-[72px] text-2xl">
                                    {isUz
                                        ? '15 dan ortiq namunalar eng yaxshisi siz uchun'
                                        : 'Более 15 образцов — выберите лучшее для себя'}
                                </h3>
                            </div>
                            <div className="img w-full relative lg:aspect-[0.59] lg:max-w-[280px]">
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