'use client'
import { navMenu } from '@/constants/constants';
import Logo from '@/icons/footer logo.svg';
import Link from 'next/link';

export default function Footer({ locale }) {
    const isUz = locale === 'uz';

    const info = [
        {
            menu: isUz ? 'FAQ' : 'Часто задаваемые вопросы',
        },
        {
            menu: isUz ? 'Maxfiylik siyosati' : 'Политика конфиденциальности',
        },
        {
            menu: isUz ? 'Foydalanish shartlari' : 'Условия использования',
        },
    ];

    const socials = [
        { menu: 'Instagram' },
        { menu: 'Facebook' },
        { menu: 'Twitter' },
    ];

    return (
        <footer className="my-[60px]">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-x-28">
                    {/* Logo и описание */}
                    <div className="logo max-w-full lg:max-w-[266px]">
                        <Logo />
                        <p className="mt-4 text-[#525252] text-sm lg:text-base">
                            {isUz
                                ? 'Kompaniyamiz restoranlar, shifoxonalar, ta’lim muassasalari, qurilish sohalari va boshqa ko‘plab yo‘nalishlar uchun maxsus kiyimlar ishlab chiqarishga ixtisoslashgan.'
                                : 'Наша компания специализируется на производстве спецодежды для ресторанов, больниц, образовательных учреждений, строительных отраслей и других направлений.'}
                        </p>
                    </div>

                    {/* Меню */}
                    <div className="text flex flex-col sm:flex-row gap-8 flex-1 justify-between">
                        <div className="box">
                            <ul className="flex flex-col gap-y-4">
                                {navMenu.map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/${locale}${item.href}`}>
                                            {isUz ? item.menu : item.menuRu}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="box">
                            <ul className="flex flex-col gap-y-4">
                                {info.map((item, index) => (
                                    <li key={index}>
                                        <p>{item.menu}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="box">
                            <ul className="flex flex-col gap-y-4">
                                {socials.map((item, index) => (
                                    <li key={index}>
                                        <p>{item.menu}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}