'use client'
import { colors } from "@/constants/constants";
import { useGlobalContext } from "@/contexts/contexts";
import { formatPrice } from "@/utils/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import ShieldIcon from '@/icons/shield-cash-protection.svg'
import TruckIcon from '@/icons/mini truck-2.svg'
import RefreshIcon from '@/icons/mini refresh-rotate.svg'
import ResizeIcon from '@/icons/resize.svg'
import Image from "next/image";

export default function ProductComponent({ product, locale }) {
    
    const isUz = locale === 'uz';
    const info = [
        { icon: <ShieldIcon />, text: isUz ? 'Xavfsiz to`lov' : 'Безопасная оплата' },
        { icon: <TruckIcon />, text: isUz ? 'Yetkazib berish' : 'Доставка' },
        { icon: <RefreshIcon />, text: isUz ? 'Almashtirish' : 'Обмен' },
        { icon: <ResizeIcon />, text: isUz ? 'Turli o’lcham' : 'Разные размеры' },
    ];

    const { setOpenDetails, addToCart } = useGlobalContext();

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const productColors = colors.filter((item) => {
        return product.colors.find((color) => item.slug === color);
    });

    const handleAdd = (id, size, color) => {
        if (!size) {
            toast.info(isUz ? "Iltimos, o‘lchamni tanlang!" : "Пожалуйста, выберите размер!");
            return;
        }

        if (!color) {
            toast.info(isUz ? "Iltimos, rang tanlang!" : "Пожалуйста, выберите цвет!");
            return;
        }

        const added = addToCart(id, { size, color });
        if (added) {
            toast.success(isUz ? "Mahsulot savatchaga qo‘shildi!" : "Товар добавлен в корзину!");
            setOpenDetails(false);
        } else {
            toast.warning(isUz ? "Bu mahsulot savatchada mavjud!" : "Этот товар уже в корзине!");
        }
    };

    return (
        <div className="productComponent">
            <div className="flex gap-x-24">
                <div className="left flex-1 max-w-[655px] flex gap-x-4">
                    <div className="images flex flex-col gap-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="img relative aspect-square bg-[#F5F5F5] w-[109px] rounded-lg overflow-hidden cursor-pointer">
                                <Image
                                    fill
                                    src={product.image}
                                    style={{ objectFit: 'contain' }}
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="imageBox flex flex-1 gap-x-2">
                        <div className="box flex-1">
                            <div className="img relative aspect-[0.80] bg-[#F6F6F6] rounded-[20px] border">
                                <Image
                                    fill
                                    src={product.image}
                                    alt={product.name}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                        <div className="scroll w-0.5 bg-[#E5E5E5] rounded-sm"></div>
                    </div>
                </div>
                <div className="right">
                    <h3 className="text-[32px] leading-10 mb-[70px]">
                        {product.name}
                    </h3>
                    <div className="size mb-8">
                        <p className="text-lg leading-[26px] mb-4">
                            {isUz ? 'O‘lchamni tanlash' : 'Выберите размер'}
                        </p>
                        <div className="box flex gap-x-4">
                            {product.sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className={`box p-1 rounded-full border cursor-pointer w-10 h-10 flex items-center justify-center
                                        ${selectedSize === size ? 'bg-black border-black text-white' : ''}`}
                                >
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center"
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        <p className="uppercase text-lg leading-[26px]">
                                            {size}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="color mb-14">
                        <p className="text-lg leading-[26px] mb-4">
                            {isUz ? 'Ranglar' : 'Цвета'}
                        </p>
                        <div className="box flex gap-x-4">
                            {productColors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`box p-1 rounded-full border border-black cursor-pointer w-10 h-10 flex items-center justify-center
                                        ${selectedColor === color.slug ? 'border-opacity-100' : 'border border-opacity-0'}`}
                                >
                                    <div
                                        style={{ background: color.hex }}
                                        className={`w-full h-full rounded-full ${color.slug === 'white' ? 'border' : ''}`}
                                        onClick={() => setSelectedColor(color.slug)}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="price flex items-center gap-x-4 mb-10">
                        <div className="box border px-8 py-4 rounded-[32px] font-medium">
                            {formatPrice(product.price)}
                        </div>
                        <button
                            className=" bg-primary-orange border border-primary-orange px-[67px] py-4 rounded-[32px] text-white"
                            onClick={() => handleAdd(product.id, selectedSize, selectedColor)}
                        >
                            {isUz ? "Savatga qo‘shish +" : "Добавить в корзину +"}
                        </button>
                    </div>
                    <div className="border-t w-full mb-8"></div>
                    <div className="info flex flex-col gap-y-5">
                        {info.map((item, index) => (
                            <div key={index} className="box flex items-center gap-x-2">
                                {item.icon}
                                <p className="text-lg leading-[26px]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom mt-12">
                <div className="box after:border-b after:absolute relative after:w-full after:bottom-0 after:-z-10">
                    <div className="box border-b border-black w-max px-5 py-3">
                        <p className="font-medium">
                            {isUz ? "To‘liq ma'lumot" : "Полная информация"}
                        </p>
                    </div>
                </div>
                <div className="box mt-6 grid grid-cols-12">
                    <p className="text-lg leading-[26px] col-span-8">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};