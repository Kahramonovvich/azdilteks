import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import CatalogComponent from "@/components/CatalogComponent";
import { clothesCategory } from "@/constants/constants";
import CallMe from "@/components/CallMe";

export default async function CatalogPage({ params, searchParams }) {

    const { locale } = await params;
    const { type, priceFrom, priceTo, page } = await searchParams;

    let products = [];

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/Product?language=${locale}`, {
            headers: { Accept: 'application/json' },
            next: { revalidate: 600, tags: ['products'] },
        });
        if (!res.ok) throw new Error('Failed');
        products = await res.json();
    } catch (e) {
        console.error(e);
    };

    let filteredProducts = products;
    let typedProducts = products;

    const activeCat = clothesCategory.find((cat) => {
        return cat.slug === type;
    });

    if (type) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category === type;
        });
        typedProducts = typedProducts.filter((product) => {
            return product.category === type;
        });
    };

    if (priceFrom && priceTo) {
        filteredProducts = filteredProducts.filter((product) => {
            const currentPrice = product.price;
            return currentPrice >= priceFrom && currentPrice <= priceTo;
        });
    };

    return (
        <div className="catalogPage">
            <div className="container">
                <div className="top lg:mt-10 flex items-center lg:gap-x-2">
                    <Link
                        href={`/${locale}`}
                        className="font-medium text-[#A3A3A3] text-xs lg:text-base"
                    >
                        {locale === 'uz' ? 'Bosh sahifa' : 'Главная страница'}
                    </Link>
                    <LinkArrowIcon />
                    <Link
                        href={`/${locale}/catalog`}
                        className="font-medium text-[#A3A3A3] text-xs lg:text-base"
                    >
                        {locale === 'uz' ? 'Katalog' : 'Каталог'}
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium text-xs lg:text-base">
                        {locale === 'uz' ? `${activeCat?.name || 'Barcha mahsulotlar'}` : `${activeCat?.nameRu || 'Все продукты'}`}
                    </p>
                </div>
                <div className="content">
                    <CatalogComponent
                        products={products}
                        priceFrom={priceFrom}
                        priceTo={priceTo}
                        type={type}
                        filteredProducts={filteredProducts}
                        typedProducts={typedProducts}
                        page={page}
                        locale={locale}
                    />
                </div>
            </div>
            <CallMe />
        </div>
    );
};