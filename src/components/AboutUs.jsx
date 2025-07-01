import LeftDownWildIcon from '@/icons/left down wide.svg'
import LeftTopWildIcon from '@/icons/left top wide.svg'
import Image from 'next/image';
import RightTopWildIcon from '@/icons/right top wide.svg'
import RightBottomWildIcon from '@/icons/right bottom wide.svg'
import RedWildIcon from '@/icons/red wide.svg'

export default function AboutUs() {
    return (
        <div className="aboutUs mt-[90px]">
            <div className="container">
                <div className="top grid grid-cols-2 items-center">
                    <h3 className="text-5xl leading-[56px]">
                        Biz haqimizda
                    </h3>
                    <p className="text-[#525252]">
                        Bu yillik tajriba, mukammal jamoa va eng muhimi, halollik va sifatga bo‘lgan sadoqatdir. Kompaniyamiz restoranlar, shifoxonalar, ta’lim muassasalari, qurilish sohalari va boshqa ko‘plab yo‘nalishlar uchun maxsus kiyimlar ishlab chiqarishga ixtisoslashgan.
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
                                Eng sifatli maxsulotlar
                            </h3>
                            <ul className="flex flex-col gap-y-4 mt-4">
                                <li className="text-[#525252]">Yevropa sifatiga teng tikuv texnologiyasi</li>
                                <li className="text-[#525252]">Tajribali tikuvchilar jamoasi</li>
                                <li className="text-[#525252]">Har bir mijoz uchun alohida yondashuv</li>
                                <li className="text-[#525252]">Brending va logotip bilan maxsus tikuv</li>
                            </ul>
                            <button className="bg-[#171717] text-white rounded-[20px] px-10 py-3 mt-10">
                                Ko’rish
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
                            Doimiy takomillashuv, mijoz fikrlariga ochiqlik va innovatsion yondashuv
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
                                Kompaniyamiz qadriyatlari
                            </p>
                            <p className='text-xs leading-6 mt-8'>
                                Biz sifatli mahsulot bilan bir qatorda, hamkorlikdagi ishonchli aloqani ham muhim deb bilamiz. Doimiy takomillashuv, mijoz fikrlariga ochiqlik va innovatsion yondashuv – bu bizning kundalik mezonlarimizdir. Siz buyurtma berganingizda, nafaqat kiyim, balki sifat, xizmat va halollik olasiz.
                            </p>
                        </div>
                        <RedWildIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};