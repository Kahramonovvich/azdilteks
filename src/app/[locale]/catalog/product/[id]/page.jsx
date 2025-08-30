import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import ProductComponent from "@/components/ProductComponent";
import RandomProducts from "@/components/RandomProducts";

export default async function ProductPage({ params }) {

    const { id, locale } = await params;

    let product = {};

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/Product/${encodeURIComponent(id)}?language=${locale}`, {
            headers: { Accept: 'application/json' },
            next: { revalidate: 600, tags: ['products'] },
        });
        if (res.ok) {
            product = await res.json();
        };
    } catch (e) {
        console.error(e);
    };

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

    return (
        <div className="productPage">
            <div className="container">
                <div className="top lg:mt-10 flex items-center lg:gap-x-2">
                    <Link
                        href={`/${locale}`}
                        className="font-medium text-[#A3A3A3] lg:text-base text-sm truncate"
                    >
                        {locale === 'uz' ? 'Bosh sahifa' : 'Главная страница'}
                    </Link>
                    <LinkArrowIcon />
                    <Link
                        href={`/${locale}/catalog`}
                        className="font-medium text-[#A3A3A3] lg:text-base text-sm"
                    >
                        {locale === 'uz' ? 'Katalog' : 'Каталог'}
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium truncate lg:text-base text-sm">
                        {product?.name}
                    </p>
                </div>
                <div className="bottom mt-8">
                    <ProductComponent
                        product={product}
                        locale={locale}
                    />
                    <RandomProducts
                        products={products}
                        id={id}
                        locale={locale}
                    />
                </div>
            </div>
        </div>
    );
};