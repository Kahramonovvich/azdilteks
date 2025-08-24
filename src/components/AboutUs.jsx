'use client'
import LeftDownWildIcon from '@/icons/left down wide.svg'
import LeftTopWildIcon from '@/icons/left top wide.svg'
import Image from 'next/image';
import RightTopWildIcon from '@/icons/right top wide.svg'
import RightBottomWildIcon from '@/icons/right bottom wide.svg'
import RedWildIcon from '@/icons/red wide.svg'
import { useRouter } from 'nextjs-toploader/app'

export default function AboutUs({ margin, locale }) {

    const isUz = locale === 'uz';

    const router = useRouter();

    return (
        <div className={`aboutUs mt-5 lg:mt-[${margin ? `${margin}px` : '90px'}]`}>
            <div className="container">
                <div className="top lg:grid grid-cols-2 items-center">
                    <h3 className="lg:text-5xl lg:leading-[56px] text-2xl mb-2 lg:mb-0">
                        {isUz ? 'Biz haqimizda' : 'О нас'}
                    </h3>
                    <p className="text-[#525252] lg:text-base text-sm">
                        {isUz
                            ? `Bu 25 yillik tajriba, mukammal jamoa va eng muhimi — halollik hamda sifatga bo‘lgan sadoqatdir. Kompaniyamiz restoranlar, shifoxonalar, ta’lim muassasalari, qurilish sohalari va boshqa ko‘plab yo‘nalishlar uchun maxsus kiyimlar ishlab chiqarishga ixtisoslashgan.`
                            : `Это 25-летний опыт, отличная команда, а главное — честность и приверженность качеству. Наша компания специализируется на производстве спецодежды для ресторанов, больниц, учебных заведений, строительной отрасли и многих других сфер.`}
                    </p>
                </div>
                <div className="bottom lg:mt-16 mt-2.5 grid grid-cols-12 grid-rows-2 lg:gap-6 gap-3">
                    <div className="left lg:col-span-7 col-span-12 lg:row-span-2 bg-[#F6F6F6] rounded-3xl lg:pt-10 lg:pl-8 relative flex gap-x-2 py-4 lg:pb-0 px-6 lg:pr-0">
                        <div className="absolute bottom-0 left-0">
                            <LeftDownWildIcon />
                        </div>
                        <div className="absolute top-3 right-0">
                            <LeftTopWildIcon />
                        </div>
                        <div className="text lg:max-w-[340px] max-w-[157px]">
                            <h3 className="lg:text-[64px] lg:leading-[72px] text-2xl">
                                {isUz ? 'Eng sifatli maxsulotlar' : 'Продукция наивысшего качества'}
                            </h3>
                            <ul className="flex flex-col lg:gap-y-4 lg:mt-4 mt-1.5 gap-y-1.5">
                                <li className="text-[#525252] lg:text-base text-xs leading-none">
                                    {isUz ? 'Yevropa sifatiga teng tikuv texnologiyasi' : 'Швейные технологии на уровне Европы'}
                                </li>
                                <li className="text-[#525252] lg:text-base text-xs leading-none">
                                    {isUz ? 'Tajribali tikuvchilar jamoasi' : 'Команда опытных швей'}
                                </li>
                                <li className="text-[#525252] lg:text-base text-xs leading-none">
                                    {isUz ? 'Har bir mijoz uchun alohida yondashuv' : 'Индивидуальный подход к каждому клиенту'}
                                </li>
                                <li className="text-[#525252] lg:text-base text-xs leading-none">
                                    {isUz ? 'Brending va logotip bilan maxsus tikuv' : 'Индивидуальный пошив с брендингом и логотипом'}
                                </li>
                            </ul>
                            <button
                                className="bg-[#171717] text-white rounded-[20px] lg:px-10 lg:py-3 lg:mt-10 relative py-2.5 px-[34px] mt-4"
                                onClick={() => router.push(`/${locale}/catalog`)}
                            >
                                {isUz ? 'Ko’rish' : 'Смотреть'}
                            </button>
                        </div>
                        <div className="img relative aspect-[0.59] lg:max-w-[280px] flex-1">
                            <Image
                                fill
                                src={'/images/aboutImg.png'}
                                alt='Biz haqimizda'
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                    <div className="rightTop lg:col-span-5 col-span-6 row-span-1 bg-[#F6F6F6] rounded-3xl relative lg:p-6 pb-0 pl-4 pt-4 flex flex-col lg:flex-row justify-between">
                        <div className="absolute bottom-0 left-0">
                            <RightBottomWildIcon />
                        </div>
                        <div className="absolute top-2 right-5">
                            <RightTopWildIcon />
                        </div>
                        <div className="text lg:max-w-[263px] lg:text-2xl lg:leading-[130%] lg:font-normal font-semibold text-xs">
                            {isUz
                                ? 'Doimiy takomillashuv, mijoz fikrlariga ochiqlik va innovatsion yondashuv'
                                : 'Постоянное развитие, открытость отзывам клиентов и инновационный подход'}
                        </div>
                        <div className="img relative aspect-[0.77] max-w-[100px] lg:max-w-max">
                            <Image
                                fill
                                src={'/images/aboutImg 2.png'}
                                alt='Biz haqimizda'
                            />
                        </div>
                    </div>
                    <div className="rightBottom bg-primary-orange lg:col-span-5 col-span-6 rounded-3xl flex items-center gap-x-2.5 p-8 text-[#E2DBCB]">
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