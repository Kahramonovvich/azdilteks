import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import CatalogComponent from "@/components/CatalogComponent";
import { products } from "../../../products";
import { clothesCategory } from "@/constants/constants";
import CallMe from "@/components/CallMe";

export default async function CatalogPage({ searchParams }) {

    const { type, priceFrom, priceTo, page } = await searchParams;

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
                <div className="top mt-10 flex items-center gap-x-2">
                    <Link
                        href={'/'}
                        className="font-medium text-[#A3A3A3]"
                    >
                        Bosh sahifa
                    </Link>
                    <LinkArrowIcon />
                    <Link
                        href={'/catalog'}
                        className="font-medium text-[#A3A3A3]"
                    >
                        Katalog
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium ">
                        {activeCat?.name || 'Barcha mahsulotlar'}
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
                    />
                </div>
            </div>
            <CallMe />
        </div>
    );
};