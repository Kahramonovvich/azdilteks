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
            <div className="top mb-12">
                <p className="text-5xl leading-[56px]">
                    {isUz ? 'Balkim yoqar' : 'Может заинтересовать'}
                </p>
            </div>
            <div className="bottom">
                <div className={`flex-1 grid gap-x-6 gap-y-8 grid-cols-4`}>
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
                                    className='font-medium truncate text-[22px] leading-[25px] block'
                                >
                                    {item.name}
                                </Link>
                                <p className='text-primary-orange font-semibold text-lg leading-none mt-2.5'>
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                            <button
                                className='font-medium text-lg leading-[21px] bg-primary-orange px-4 py-2 mt-2.5 text-white rounded-[20px]'
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