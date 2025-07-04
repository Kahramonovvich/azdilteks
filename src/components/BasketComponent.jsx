'use client'
import CheckIcon from '@/icons/check.svg'
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/contexts/contexts';
import Image from 'next/image';
import { formatPrice } from '@/utils/utils';
import { colors } from '@/constants/constants';
import MinusIcon from '@/icons/minus.svg'
import AddIcon from '@/icons/add.svg'
import DeleteIcon from '@/icons/trash.svg'
import { toast } from 'react-toastify';

export default function BasketComponent({ products, locale }) {
    const isUz = locale === 'uz';

    const {
        cart,
        removeFromCart,
        updateQuantity,
        toggleCheck,
        handleCheckAll,
        setOrderModal,
    } = useGlobalContext();

    const [mounted, setMounted] = useState(false);

    const selectedColor = (color) => {
        const colItem = colors.find(item => item.slug === color);
        return colItem?.hex || null;
    };

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const productsOnBasket = cart.map(cartItem => {
        const product = products.find(p => Number(p.id) === Number(cartItem.id));
        return product ? { ...product, ...cartItem } : null;
    }).filter(Boolean);

    const calculateTotalPrice = (items) =>
        items.reduce((sum, item) => item.isChecked ? sum + (item.price * item.quantity) : sum, 0);

    const allChaked = productsOnBasket.every(item => item.isChecked);

    const handleSendOrder = () => {
        const isOneChecked = productsOnBasket.some(item => item.isChecked);
        if (!isOneChecked) {
            toast.error(isUz ? "Savatcha bo‘sh yoki mahsulot tanlanmagan!" : "Корзина пуста или не выбраны товары!");
        } else {
            setOrderModal(true);
        }
    };

    return (
        <div className="basketComponent mt-10">
            <div className="flex gap-x-[52px]">
                <div className="left flex-1">
                    <div className="top border-b py-7">
                        <div className="box grid grid-cols-2 items-center gap-x-6">
                            <div className="left flex items-center gap-x-4">
                                <button
                                    className={`box rounded-full w-6 h-6 flex items-center justify-center ${allChaked ? 'bg-primary-orange' : 'border'}`}
                                    onClick={handleCheckAll}
                                >
                                    {allChaked && <CheckIcon />}
                                </button>
                                <p className="font-medium text-[#A3A3A3]">
                                    {isUz ? 'Maxsulotlar' : 'Товары'}
                                </p>
                            </div>
                            <div className="right flex items-center justify-between">
                                <p className="font-medium text-[#A3A3A3]">{isUz ? 'Soni' : 'Количество'}</p>
                                <p className="font-medium text-[#A3A3A3]">{isUz ? 'Narxi' : 'Цена'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        {productsOnBasket.map((item, index) => (
                            <div key={index} className="box border-b py-7">
                                <div className="grid grid-cols-2 items-center gap-x-6">
                                    <div className="left flex items-center gap-x-4">
                                        <button
                                            className={`box rounded-full w-6 h-6 flex items-center justify-center ${item.isChecked ? 'bg-primary-orange' : 'border'}`}
                                            onClick={() => toggleCheck(item.id, item.selectedOptions, !item.isChecked)}
                                        >
                                            {item.isChecked && <CheckIcon />}
                                        </button>
                                        <div className="img relative aspect-[0.89] max-w-32 w-full overflow-hidden rounded-2xl">
                                            <Image
                                                fill
                                                src={item.image}
                                                style={{ objectFit: 'contain' }}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="box flex-1 max-w-[228px]">
                                            <p className='font-semibold text-lg leading-[26px] mb-2 truncate block'>
                                                {item.name}
                                            </p>
                                            <p className='text-lg leading-[26px] text-[#A3A3A3] mb-2'>
                                                {isUz ? 'O‘lcham:' : 'Размер:'}
                                                <span className='font-medium text-[#171717] uppercase'> {item.selectedOptions.size}</span>
                                            </p>
                                            <div className="box flex items-center gap-x-2">
                                                <p className='text-lg leading-[26px] text-[#A3A3A3]'>
                                                    {isUz ? 'Rang:' : 'Цвет:'}
                                                </p>
                                                <div
                                                    className={`color w-5 h-5 rounded-full ${item.selectedOptions.color === 'white' ? 'border' : ''}`}
                                                    style={{ background: selectedColor(item.selectedOptions.color) }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right flex items-center justify-between">
                                        <div className="flex items-center gap-x-6">
                                            <div className="quantity flex items-center gap-x-1">
                                                <button
                                                    onClick={() =>
                                                        item.quantity === 1
                                                            ? removeFromCart(item.id, item.selectedOptions)
                                                            : updateQuantity(item.id, item.selectedOptions, item.quantity - 1)
                                                    }
                                                    className='p-1'
                                                >
                                                    <MinusIcon />
                                                </button>
                                                <div className="box flex items-center justify-center rounded-full border w-8 h-8">
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedOptions, item.quantity + 1)}
                                                    className='p-1'
                                                >
                                                    <AddIcon />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedOptions)}
                                                className="delete flex items-center gap-x-1.5"
                                            >
                                                <DeleteIcon />
                                                <p className='font-medium text-sm leading-[22px]'>
                                                    {isUz ? 'O‘chirish' : 'Удалить'}
                                                </p>
                                            </button>
                                        </div>
                                        <p className='price'>
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right p-6 border h-max max-w-[380px] rounded-2xl">
                    <p className='text-xl font-bold mb-2'>
                        {isUz ? 'Buyurtma xulosasi' : 'Сводка заказа'}
                    </p>
                    <p className='text-[#171717]'>
                        {isUz
                            ? "Umumiy xarajat vaqtinchalik xarajatlardan iborat bo'lib, yuk tashish xarajatlarini hisobga olmaganda"
                            : "Общая стоимость является предварительной и не включает доставку"}
                    </p>
                    <div className="price mt-6 flex flex-col gap-y-4">
                        <div className="box flex items-center justify-between">
                            <p className='text-lg leading-[26px] text-[#525252]'>{isUz ? 'Narx:' : 'Цена:'}</p>
                            <p className='text-lg leading-[26px] text-[#171717]'>
                                {formatPrice(calculateTotalPrice(productsOnBasket))}
                            </p>
                        </div>
                        <div className="border"></div>
                        <div className="totalPrice">
                            <div className="box flex items-center justify-between">
                                <p className='text-lg leading-[26px] text-[#525252]'>
                                    {isUz ? 'Umumiy narx:' : 'Итоговая сумма:'}
                                </p>
                                <p className='text-lg leading-[26px] text-[#171717] font-semibold'>
                                    {formatPrice(calculateTotalPrice(productsOnBasket))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSendOrder}
                        className='bg-primary-orange rounded-3xl p-4 w-full text-white mt-12'
                    >
                        {isUz ? 'Buyurtma berish' : 'Оформить заказ'}
                    </button>
                </div>
            </div>
        </div>
    );
};