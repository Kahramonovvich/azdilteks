'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { formatPrice } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RandomProducts({ products, id, locale }) {

    const isUz = locale === 'uz';

    const { setOpenDetails, setSelectedId } = useGlobalContext();

    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter((p) => p.id !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 4));
    }, [products, id]);

    return (
        <div className="randomProducts mt-[60px]">
            <div className="top lg:mb-12 mb-4">
                <p className="lg:text-5xl lg:leading-[56px] text-2xl">
                    {isUz ? 'Balkim yoqar' : 'Может заинтересовать'}
                </p>
            </div>
            <div className="bottom">
                <div className={`flex-1 grid lg:gap-x-6 gap-x-3 gap-y-4 lg:gap-y-8 lg:grid-cols-4 grid-cols-2`}>
                    {randomProducts?.slice(0, 4).map((item) => (
                        <div
                            key={item.id}
                            className="box"
                        >
                            <div className="img relative bg-[#F6F6F6] border rounded-[22px] aspect-[0.93] overflow-hidden">
                                <Image
                                    fill
                                    src={item.image}
                                    alt={item.name}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="text mt-2.5">
                                <Link
                                    href={`/${locale}/catalog/product/${item.id}`}
                                    className='font-medium truncate lg:text-[22px] lg:leading-[25px] block'
                                >
                                    {item.name}
                                </Link>
                                <p className='text-primary-orange font-semibold lg:text-lg text-sm leading-none mt-2.5'>
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                            <button
                                className='font-medium lg:text-lg lg:leading-[21px] bg-primary-orange lg:px-4 lg:py-2 w-full lg:w-auto p-2 text-sm mt-2.5 text-white rounded-[20px]'
                                onClick={() => {
                                    setOpenDetails(true);
                                    setSelectedId(item.id);
                                }}
                            >
                                {isUz ? "Savatga qo‘shish +" : "Добавить в корзину +"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};