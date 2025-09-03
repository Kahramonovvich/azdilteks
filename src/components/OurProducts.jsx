'use client'
import DropDownIcon from '@/icons/Arrow.svg'
import { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app'
import Image from 'next/image';
import { formatPrice } from '@/utils/utils';
import { industry } from '@/constants/constants';
import { useGlobalContext } from '@/contexts/contexts';
import Link from 'next/link';

export default function OurProducts({ selectedIndustry, selectedSex, selectedProducts, locale }) {

    const router = useRouter();
    const { setOpenDetails, setSelectedId } = useGlobalContext();

    const [dropDown, setDropDown] = useState(false);
    const [sex, setSex] = useState(selectedSex || 'men');
    const [activeIndustry, setActiveIndustry] = useState(selectedIndustry || 'all');

    useEffect(() => {
        setActiveIndustry(selectedIndustry || 'all');
        setSex(selectedSex || 'men');
    }, [selectedIndustry, selectedSex]);

    const texts = {
        title: locale === 'ru' ? 'Наши продукты' : 'Bizning maxsulotlar',
        men: locale === 'ru' ? 'Для мужчин' : 'Erkaklar uchun',
        women: locale === 'ru' ? 'Для женщин' : 'Ayollar uchun',
        all: locale === 'ru' ? 'Все' : 'Barchasi',
        addToCart: locale === 'ru' ? 'Добавить в корзину +' : 'Savatga qo’shish +',
    };

    return (
        <div className="ourProducts mt-[60px] overflow-hidden">
            <div className="container">
                <div className="top">
                    <h3 className="lg:text-5xl lg:leading-[56px] text-2xl">
                        {texts.title}
                    </h3>
                    <div className="lg:flex grid grid-cols-2 items-center lg:gap-x-5 gap-x-1.5 lg:mt-12 mt-5">
                        <div className="dropDown cursor-pointer rounded-3xl border lg:px-5 lg:py-3 p-3 relative">
                            <div
                                className="box flex items-center gap-x-2 justify-between"
                                onClick={() => setDropDown(!dropDown)}
                            >
                                <p className='font-medium lg:text-base text-sm text-nowrap'>
                                    {sex === 'men' ? texts.men : texts.women}
                                </p>
                                <DropDownIcon
                                    className={`transition-all duration-300 ${dropDown ? 'rotate-180' : ''}`}
                                />
                            </div>
                            <div
                                className={`absolute z-20 bg-white top-full left-0 w-full rounded-3xl mt-2 overflow-hidden transition-all duration-300
                                    ${dropDown ? 'max-h-60 border' : 'max-h-0'}`}
                            >
                                <button
                                    className='hover:bg-slate-200 text-left lg:px-5 lg:py-3 p-3 w-full font-medium lg:text-base text-sm text-nowrap'
                                    onClick={() => {
                                        setSex('men');
                                        setDropDown(false);
                                        router.push(`/${locale}/?gender=men${activeIndustry !== 'all' ? `&industry=${activeIndustry}` : ''}`);
                                    }}
                                >
                                    {texts.men}
                                </button>
                                <button
                                    className='hover:bg-slate-200 text-left lg:px-5 lg:py-3 p-3 w-full font-medium lg:text-base text-sm text-nowrap'
                                    onClick={() => {
                                        setSex('women');
                                        setDropDown(false);
                                        router.push(`/${locale}/?gender=women${activeIndustry !== 'all' ? `&industry=${activeIndustry}` : ''}`);
                                    }}
                                >
                                    {texts.women}
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-x-5">
                            <button
                                onClick={() => {
                                    router.push(`/${locale}/?${sex ? `gender=${sex}` : ''}`);
                                    setActiveIndustry('all');
                                }}
                                className={`font-medium lg:px-5 lg:py-3 p-3 text-nowrap text-sm lg:text-base rounded-3xl transition-all duration-300 ease-in-out
                                    ${activeIndustry === 'all' ? 'bg-black text-white' : 'hover:bg-gray-500 hover:text-white'}`}
                            >
                                {texts.all}
                            </button>
                            {industry.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        router.push(`/${locale}/?${sex ? `gender=${sex}&` : ''}industry=${item.slug}`);
                                        setActiveIndustry(item.slug);
                                    }}
                                    className={`font-medium lg:px-5 lg:py-3 p-3 lg:text-base text-sm rounded-3xl text-nowrap transition-all duration-300 ease-in-out
                                    ${activeIndustry === item.slug ? 'bg-black text-white' : 'hover:bg-gray-500 hover:text-white'}`}
                                >
                                    {locale === 'ru' ? item.nameRu : item.name}
                                </button>
                            ))}
                        </div>
                        <select
                            name="industry"
                            id="industry"
                            value={activeIndustry}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'all') {
                                    router.push(`/${locale}/?${sex ? `gender=${sex}` : ''}`);
                                    setActiveIndustry('all');
                                } else {
                                    router.push(`/${locale}/?${sex ? `gender=${sex}&` : ''}industry=${value}`);
                                    setActiveIndustry(value);
                                }
                            }}
                            className="block lg:hidden w-full border rounded-3xl px-3 py-3.5 font-medium text-sm focus:outline-none bg-transparent h-[49.6px]"
                        >
                            <option value="all">{texts.all}</option>
                            {industry.map((item, index) => (
                                <option key={index} value={item.slug}>
                                    {locale === 'ru' ? item.nameRu : item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="bottom mt-6 grid lg:grid-cols-3 lg:gap-6 gap-x-1.5 gap-y-3 grid-cols-2">
                    {selectedProducts.slice(0, 4).map((item) => (
                        <div
                            className={`box ${selectedProducts?.length >= 3 ? 'lg:last-of-type:hidden' : ''}`}
                            key={item.productId}
                        >
                            <div className="img relative aspect-[0.842] border rounded-[32px] bg-[#F6F6F6] overflow-hidden">
                                <Image
                                    fill
                                    alt={item.name}
                                    src={`/api/img?src=${encodeURIComponent(item.imageLink)}`}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="bottom lg:mt-[15px] mt-1.5">
                                <Link
                                    href={`${locale}/catalog/product/${item.productId}`}
                                    className='name font-medium lg:text-2xl mb-1 text-nowrap truncate block'
                                >
                                    {item.name}
                                </Link>
                                <p className='text-primary-orange lg:text-lg lg:leading-[26px] font-semibold text-sm'>
                                    {formatPrice(item.price)}
                                </p>
                                <button
                                    className='text-white bg-primary-orange rounded-[32px] lg:px-6 lg:py-3 px-2.5 py-1.5 lg:mt-[27px] mt-1.5 font-medium lg:text-base text-xs'
                                    onClick={() => {
                                        setSelectedId(item.productId);
                                        setOpenDetails(true);
                                    }}
                                >
                                    {texts.addToCart}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};