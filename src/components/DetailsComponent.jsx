'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from '@/icons/close.svg'
import Image from "next/image";
import { colors } from "@/constants/constants";
import { normalizeColors, normalizeSizes } from "@/utils/utils";

export default function DetailsComponent({ locale }) {

    const { openDetails, setOpenDetails, addToCart, selectedId, setSelectedId } = useGlobalContext();

    const [product, setProduct] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {

        if (!selectedId) { setProduct({}); return; }

        const loadProduct = async () => {
            try {
                const res = await fetch(`/api/Product/${selectedId}?language=${locale}`);
                if (res.ok) {
                    const prd = await res.json();
                    setProduct(prd);
                };
            } catch (e) {
                console.error(e);
            };
        };

        loadProduct();
    }, [selectedId]);

    const productColors = colors.filter((item) => {
        return normalizeColors(product.color).find((color) => item.slug === color);
    });

    const handleAdd = (id, size, color) => {

        if (!size) {
            toast.info('Iltimos, o`lchamni tanlang!');
            return;
        };

        if (!color) {
            toast.info('Iltimos, rang tanlang!');
            return;
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
        setSelectedId(null);
        setProduct({});
    };

    if (!openDetails || !selectedId) return null;

    return (
        <Modal
            open={openDetails}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="px-4 lg:p-0"
        >
            <div className="relative w-full h-full">
                <div className="box lg:p-10 p-3 bg-white absolute top-1/2 left-1/2 rounded-[30px] -translate-x-1/2 -translate-y-1/2 lg:w-[1056px] w-full">
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
                        <div className="flex lg:flex-row flex-col lg:gap-x-[67px]">
                            <div className="left flex-1 max-w-[479px] flex gap-x-3">
                                {product?.imageLinks?.length >= 2 && (
                                    <div className="box flex flex-col gap-y-3">
                                        {product?.imageLinks?.map((img, index) => (
                                            <div
                                                key={index}
                                                className="img aspect-square overflow-hidden lg:w-14 w-10 bg-[#F5F5F5] rounded-md relative cursor-pointer"
                                                onClick={() => setSelectedIndex(index)}
                                            >
                                                <Image
                                                    fill
                                                    src={`/api/img?src=${encodeURIComponent(img)}`}
                                                    alt={product?.name}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex-1 aspect-square lg:aspect-auto overflow-hidden bg-[#F6F6F6] border relative rounded-[15px]">
                                    <Image
                                        fill
                                        src={`/api/img?src=${encodeURIComponent(product?.imageLinks?.[selectedIndex])}`}
                                        alt={product?.name || 'rasm'}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <p className="lg:text-[32px] lg:leading-10 lg:mb-10 text-2xl my-3 lg:mt-0">
                                    {product?.name}
                                </p>
                                <div className="size">
                                    <p className="text-lg leading-[26px] lg:mb-4 mb-2">
                                        O’lchamni tanlash
                                    </p>
                                    <div className="box flex lg:gap-x-4 gap-x-2">
                                        {product?.size && normalizeSizes(product?.size).map((item) => (
                                            <button
                                                key={item}
                                                className={`box border rounded-full lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center
                                                    lg:text-lg lg:leading-[26px] uppercase text-sm
                                                        ${selectedSize === item ? 'border-black text-white bg-black' : ''}`}
                                                onClick={() => setSelectedSize(item)}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="color mt-5">
                                    <p className="text-lg leading-[26px] lg:mb-4 mb-2">
                                        Ranglar
                                    </p>
                                    <div className="box flex gap-2">
                                        {productColors?.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`box rounded-full lg:w-10 w-8 lg:h-10 h-8 flex items-center justify-center text-lg leading-[26px]
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
                            onClick={() => handleAdd(product.productId, selectedSize, selectedColor)}
                        >
                            Tanlash
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};