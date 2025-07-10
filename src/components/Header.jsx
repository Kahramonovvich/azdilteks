'use client'
import WideIcon from '@/icons/header wide.svg'
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app'

export default function Header({ locale }) {

    const infoBox = [
        {
            count: '80+',
            title: locale === 'uz' ? 'Restoran' : 'Ресторанов'
        },
        {
            count: '40+',
            title: locale === 'uz' ? 'Ta’lim markazlari' : 'Образовательных центров'
        },
        {
            count: '60+',
            title: locale === 'uz' ? 'Qurilish firmalari' : 'Строительных компаний'
        },
    ];

    const router = useRouter();

    return (
        <div className='header'>
            <div className="container">
                <div className="box lg:aspect-[16/10] bg-[#F6F6F6] rounded-3xl p-5 lg:pl-20 flex flex-col justify-center relative lg:py-0">
                    <div className="box absolute top-[94px] right-6 hidden lg:block">
                        <WideIcon />
                    </div>
                    <div className="box absolute bottom-0 right-28 hidden lg:block">
                        <div className="img relative w-[566px] h-[757px]">
                            <Image
                                fill
                                src={'/images/barber-man background 1.png'}
                                alt='img'
                            />
                        </div>
                    </div>
                    <h1 className="font-bold text-3xl lg:text-[54px] leading-10 lg:leading-[72px] capitalize text-balance">
                        {locale === 'uz' ? (
                            <>
                                Sizning Restoraningiz
                                <br />
                                Uchun Maxsus Tikilgan
                                <br />
                                Forma.
                            </>
                        ) : (
                            <>
                                Специально сшитая
                                <br />
                                форма для вашего
                                <br />
                                ресторана и не только.
                            </>
                        )}
                    </h1>
                    <h2 className="text-[#525252] mt-2 mb-5 text-lg lg:text-base">
                        {locale === 'uz' ? (
                            <>
                                Biz korxonalar, maktablar, oshxonalar va tashkilotlar uchun
                                <br />
                                zamonaviy, chidamli va shinam uniformalarni tikib beramiz.
                                <br />
                                Sizning talab va uslubingizga mos ravishda.
                            </>
                        ) : (
                            <>
                                Мы шьём современную, удобную и прочную форму
                                <br />
                                для организаций, школ, столовых и предприятий.
                                <br />
                                Под ваш стиль и требования.
                            </>
                        )}
                    </h2>
                    <button
                        className="w-full lg:w-max bg-primary-orange font-medium text-white rounded-3xl px-6 lg:px-10 py-3 lg:py-4 mb-5 lg:mb-[67px]"
                        onClick={() => router.push(`/${locale}/catalog`)}
                    >
                        {locale === 'uz' ? 'Katalog' : 'Каталог'}
                    </button>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 lg:gap-y-0 gap-x-8">
                        {infoBox.map((item) => (
                            <div
                                key={item.title}
                                className="box"
                            >
                                <p className="lg:text-5xl text-2xl lg:leading-[56px] mb-0.5">{item.count}</p>
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};