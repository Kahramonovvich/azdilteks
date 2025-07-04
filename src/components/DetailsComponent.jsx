'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from '@/icons/close.svg'
import Image from "next/image";
import { products } from "../../products";
import { colors } from "@/constants/constants";

export default function DetailsComponent() {

    const { openDetails, setOpenDetails, addToCart, selectedId } = useGlobalContext();

    const product = products.find((item) => Number(item.id) === Number(selectedId));

    const productColors = colors.filter((item) => {
        return product?.colors.find((color) => item.slug === color);
    });

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleAdd = (id, size, color) => {

        if (!size) {
            toast.info('Iltimos, o`lchamni tanlang!');
            return
        };

        if (!color) {
            toast.info('Iltimos, rang tanlang!');
            return
        };

        const added = addToCart(id, { size, color });
        if (added) {
            toast.success("Mahsulot savatchaga qo`shildi!");
            setOpenDetails(false);
        } else {
            toast.warning("Bu mahsulot savatchada mavjud!");
        };
    };

    const handleClose = () => {
        setOpenDetails(false);
        setSelectedColor('');
        setSelectedSize('');
    };

    return (
        <Modal
            open={openDetails}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="box p-10 bg-white absolute top-1/2 left-1/2 rounded-[30px] -translate-x-1/2 -translate-y-1/2 w-[1056px]">
                <div className="top flex items-center justify-between pb-3 border-b">
                    <p className="font-bold text-2xl">
                        Keraklisini tanlang
                    </p>
                    <button
                        onClick={handleClose}
                        className="close p-2.5"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="bottom mt-6">
                    <div className="flex gap-x-[67px]">
                        <div className="left flex-1 max-w-[479px] flex gap-x-3">
                            <div className="box flex flex-col gap-y-3">
                                <div className="img aspect-square w-20 bg-[#F5F5F5] rounded-md relative">
                                    <Image
                                        fill
                                        src={product?.image}
                                        alt={product?.name}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="img aspect-square w-20 bg-[#F5F5F5] rounded-md relative">
                                    <Image
                                        fill
                                        src={product?.image}
                                        alt={product?.name}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="img aspect-square w-20 bg-[#F5F5F5] rounded-md relative">
                                    <Image
                                        fill
                                        src={product?.image}
                                        alt={product?.name}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="img aspect-square w-20 bg-[#F5F5F5] rounded-md relative">
                                    <Image
                                        fill
                                        src={product?.image}
                                        alt={product?.name}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 bg-[#F6F6F6] border relative rounded-[15px]">
                                <Image
                                    fill
                                    src={product?.image}
                                    alt={product?.name}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <p className="text-[32px] leading-10 mb-[70px]">
                                {product?.name}
                            </p>
                            <div className="size">
                                <p className="text-lg leading-[26px] mb-4">
                                    O’lchamni tanlash
                                </p>
                                <div className="box flex gap-x-4">
                                    {product?.sizes.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`box border rounded-full w-10 h-10 flex items-center justify-center
                                                text-lg leading-[26px] uppercase ${selectedSize === item ? 'border-black text-white bg-black' : ''}`}
                                            onClick={() => setSelectedSize(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="color">
                                <p className="text-lg leading-[26px] mb-4">
                                    Ranglar
                                </p>
                                <div className="box flex gap-x-4">
                                    {productColors?.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`box rounded-full w-10 h-10 flex items-center justify-center text-lg leading-[26px]
                                                uppercase cursor-pointer p-1 border-opacity-0 border border-black
                                                ${selectedColor === item.slug ? 'border-opacity-100' : ''}`}
                                            onClick={() => setSelectedColor(item.slug)}
                                        >
                                            <div
                                                style={{ background: item.hex }}
                                                className={`w-full h-full rounded-full
                                            ${item.slug === 'white' ? 'border' : ''}`}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-primary-orange font-medium mt-7 w-full p-4 rounded-3xl text-white"
                        onClick={() => handleAdd(product.id, selectedSize, selectedColor)}
                    >
                        Tanlash
                    </button>
                </div>
            </div>
        </Modal>
    );
};