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
                <div className="box aspect-[16/10] bg-[#F6F6F6] rounded-3xl pl-20 flex flex-col justify-center relative">
                    <div className="box absolute top-[94px] right-6">
                        <WideIcon />
                    </div>
                    <div className="box absolute bottom-0 right-28">
                        <div className="img relative w-[566px] h-[757px]">
                            <Image
                                fill
                                src={'/images/barber-man background 1.png'}
                                alt='img'
                            />
                        </div>
                    </div>
                    <h1 className="font-bold text-[54px] leading-[72px] capitalize">
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
                    <h2 className="text-[#525252] mt-2 mb-5">
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
                        className="w-max bg-primary-orange font-medium text-white rounded-3xl px-10 py-4 mb-[67px]"
                        onClick={() => router.push(`/${locale}/catalog`)}
                    >
                        {locale === 'uz' ? 'Katalog' : 'Каталог'}
                    </button>
                    <div className="flex items-center gap-x-8">
                        {infoBox.map((item) => (
                            <div
                                key={item.title}
                                className="box"
                            >
                                <p className="text-5xl leading-[56px] mb-0.5">{item.count}</p>
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};