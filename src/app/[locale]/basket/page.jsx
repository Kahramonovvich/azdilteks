import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import BasketComponent from "@/components/BasketComponent";
import OrderModal from "@/components/OrderModal";
import { products } from "../../../../products";

export default async function BasketPage({ params }) {

    const { locale } = await params;
    const productsOnBasket = products;

    return (
        <div className="basketPage">
            <OrderModal />
            <div className="container">
                <div className="top flex items-center gap-x-2 mt-[46px]">
                    <Link
                        href={`/${locale}`}
                        className="font-medium text-[#A3A3A3]"
                    >
                        {locale === 'uz' ? 'Bosh sahifa' : 'Главная страница'}
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium">
                        {locale === 'uz' ? 'Savatcham' : 'Моя корзина'}
                    </p>
                </div>
                <h2 className="text-[32px] leading-10 mt-8">
                    {locale === 'uz' ? 'Savatcham' : 'Моя корзина'}
                </h2>
                <BasketComponent
                    products={productsOnBasket}
                    locale={locale}
                />
            </div>
        </div>
    );
};