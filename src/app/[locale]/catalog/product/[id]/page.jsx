import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import ProductComponent from "@/components/ProductComponent";
import RandomProducts from "@/components/RandomProducts";
import { products } from "../../../../../../products";

export default async function ProductPage({ params }) {

    const { id, locale } = await params;

    const product = products.find((item) => Number(item.id) === Number(id));

    return (
        <div className="productPage">
            <div className="container">
                <div className="top mt-10 flex items-center gap-x-2">
                  <Link
                        href={`/${locale}`}
                        className="font-medium text-[#A3A3A3]"
                    >
                        {locale === 'uz' ? 'Bosh sahifa' : 'Главная страница'}
                    </Link>
                    <LinkArrowIcon />
                    <Link
                        href={`/${locale}/catalog`}
                        className="font-medium text-[#A3A3A3]"
                    >
                        {locale === 'uz' ? 'Katalog' : 'Каталог'}
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium truncate">
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