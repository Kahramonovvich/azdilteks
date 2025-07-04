'use client'
import LeftDownWildIcon from '@/icons/left down wide.svg'
import LeftTopWildIcon from '@/icons/left top wide.svg'
import Image from 'next/image';
import RightTopWildIcon from '@/icons/right top wide.svg'
import RightBottomWildIcon from '@/icons/right bottom wide.svg'
import RedWildIcon from '@/icons/red wide.svg'

export default function AboutUs({ margin, locale }) {
    const isUz = locale === 'uz';

    return (
        <div className={`aboutUs mt-[${margin ? `${margin}px` : '90px'}]`}>
            <div className="container">
                <div className="top grid grid-cols-2 items-center">
                    <h3 className="text-5xl leading-[56px]">
                        {isUz ? 'Biz haqimizda' : 'О нас'}
                    </h3>
                    <p className="text-[#525252]">
                        {isUz
                            ? `Bu yillik tajriba, mukammal jamoa va eng muhimi, halollik va sifatga bo‘lgan sadoqatdir. Kompaniyamiz restoranlar, shifoxonalar, ta’lim muassasalari, qurilish sohalari va boshqa ko‘plab yo‘nalishlar uchun maxsus kiyimlar ishlab chiqarishga ixtisoslashgan.`
                            : `Это многолетний опыт, слаженная команда и, главное, преданность честности и качеству. Наша компания специализируется на производстве спецодежды для ресторанов, больниц, образовательных учреждений, строительных сфер и многих других направлений.`}
                    </p>
                </div>

                <div className="bottom mt-16 grid grid-cols-12 grid-rows-2 gap-6">
                    <div className="left col-span-7 row-span-2 bg-[#F6F6F6] rounded-3xl pt-10 pl-8 relative flex gap-x-2">
                        <div className="absolute bottom-0 left-0">
                            <LeftDownWildIcon />
                        </div>
                        <div className="absolute top-3 right-0">
                            <LeftTopWildIcon />
                        </div>
                        <div className="text max-w-[340px]">
                            <h3 className="text-[64px] leading-[72px]">
                                {isUz ? 'Eng sifatli maxsulotlar' : 'Продукция наивысшего качества'}
                            </h3>
                            <ul className="flex flex-col gap-y-4 mt-4">
                                <li className="text-[#525252]">
                                    {isUz ? 'Yevropa sifatiga teng tikuv texnologiyasi' : 'Швейные технологии на уровне Европы'}
                                </li>
                                <li className="text-[#525252]">
                                    {isUz ? 'Tajribali tikuvchilar jamoasi' : 'Команда опытных швей'}
                                </li>
                                <li className="text-[#525252]">
                                    {isUz ? 'Har bir mijoz uchun alohida yondashuv' : 'Индивидуальный подход к каждому клиенту'}
                                </li>
                                <li className="text-[#525252]">
                                    {isUz ? 'Brending va logotip bilan maxsus tikuv' : 'Индивидуальный пошив с брендингом и логотипом'}
                                </li>
                            </ul>
                            <button className="bg-[#171717] text-white rounded-[20px] px-10 py-3 mt-10 relative">
                                {isUz ? 'Ko’rish' : 'Смотреть'}
                            </button>
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

                    <div className="rightTop col-span-5 row-span-1 bg-[#F6F6F6] rounded-3xl relative p-6 pb-0 flex">
                        <div className="absolute bottom-0 left-0">
                            <RightBottomWildIcon />
                        </div>
                        <div className="absolute top-2 right-5">
                            <RightTopWildIcon />
                        </div>
                        <div className="text max-w-[263px] text-2xl leading-[130%]">
                            {isUz
                                ? 'Doimiy takomillashuv, mijoz fikrlariga ochiqlik va innovatsion yondashuv'
                                : 'Постоянное развитие, открытость отзывам клиентов и инновационный подход'}
                        </div>
                        <div className="img relative aspect-[0.77]">
                            <Image
                                fill
                                src={'/images/aboutImg 2.png'}
                                alt='Biz haqimizda'
                            />
                        </div>
                    </div>

                    <div className="rightBottom bg-primary-orange col-span-5 rounded-3xl flex items-center gap-x-2.5 p-8 text-[#E2DBCB]">
                        <div className="text flex-1">
                            <p className='text-2xl text-nowrap'>
                                {isUz ? 'Kompaniyamiz qadriyatlari' : 'Наши ценности'}
                            </p>
                            <p className='text-xs leading-6 mt-8'>
                                {isUz
                                    ? `Biz sifatli mahsulot bilan bir qatorda, hamkorlikdagi ishonchli aloqani ham muhim deb bilamiz. Doimiy takomillashuv, mijoz fikrlariga ochiqlik va innovatsion yondashuv – bu bizning kundalik mezonlarimizdir. Siz buyurtma berganingizda, nafaqat kiyim, balki sifat, xizmat va halollik olasiz.`
                                    : `Мы считаем важным не только качественный продукт, но и надёжные партнёрские отношения. Постоянное развитие, открытость клиентским отзывам и инновационный подход — это наши повседневные принципы. Заказывая у нас, вы получаете не просто одежду, а качество, сервис и честность.`}
                            </p>
                        </div>
                        <RedWildIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};