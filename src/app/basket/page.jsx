import Link from "next/link";
import LinkArrowIcon from '@/icons/Arrow next page.svg'
import BasketComponent from "@/components/BasketComponent";
import { products } from "../../../products";
import OrderModal from "@/components/OrderModal";

export default function BasketPage() {

    const productsOnBasket = products;

    return (
        <div className="basketPage">
            <OrderModal />
            <div className="container">
                <div className="top flex items-center gap-x-2 mt-[46px]">
                    <Link
                        href={'/'}
                        className="font-medium text-[#A3A3A3]"
                    >
                        Bosh sahifa
                    </Link>
                    <LinkArrowIcon />
                    <p className="font-medium">
                        Savatcham
                    </p>
                </div>
                <h2 className="text-[32px] leading-10 mt-8">
                    Savatcham
                </h2>
                <BasketComponent products={productsOnBasket} />
            </div>
        </div>
    );
};