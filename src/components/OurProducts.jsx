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
        <div className="ourProducts mt-[60px]">
            <div className="container">
                <div className="top">
                    <h3 className="text-5xl leading-[56px]">
                        {texts.title}
                    </h3>
                    <div className="flex items-center gap-x-5 mt-12">
                        <div className="dropDown cursor-pointer rounded-3xl border px-5 py-3 relative">
                            <div
                                className="box flex items-center gap-x-2"
                                onClick={() => setDropDown(!dropDown)}
                            >
                                <p className='font-medium'>
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
                                    className='hover:bg-slate-200 text-left px-5 py-3 w-full font-medium'
                                    onClick={() => {
                                        setSex('men');
                                        setDropDown(false);
                                        router.push(`/${locale}/?gender=men${activeIndustry !== 'all' ? `&industry=${activeIndustry}` : ''}`);
                                    }}
                                >
                                    {texts.men}
                                </button>
                                <button
                                    className='hover:bg-slate-200 text-left px-5 py-3 w-full font-medium'
                                    onClick={() => {
                                        setSex('woman');
                                        setDropDown(false);
                                        router.push(`/${locale}/?gender=woman${activeIndustry !== 'all' ? `&industry=${activeIndustry}` : ''}`);
                                    }}
                                >
                                    {texts.women}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                router.push(`/${locale}/?${sex ? `gender=${sex}` : ''}`);
                                setActiveIndustry('all');
                            }}
                            className={`font-medium px-5 py-3 rounded-3xl ${activeIndustry === 'all' ? 'bg-black text-white' : ''}`}
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
                                className={`font-medium px-5 py-3 rounded-3xl ${activeIndustry === item.slug ? 'bg-black text-white' : ''}`}
                            >
                                {locale === 'ru' ? item.nameRu : item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bottom mt-6 grid grid-cols-3 gap-x-6">
                    {selectedProducts.slice(0, 3).map((item, index) => (
                        <div className="box" key={index}>
                            <div className="img relative aspect-[0.842] border rounded-[32px] bg-[#F6F6F6] overflow-hidden">
                                <Image
                                    fill
                                    alt={item.name}
                                    src={item.image}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="bottom mt-[15px]">
                                <Link
                                    href={`${locale}/catalog/product/${item.id}`}
                                    className='name font-medium text-2xl mb-1 text-nowrap truncate block'
                                >
                                    {item.name}
                                </Link>
                                <p className='text-primary-orange text-lg leading-[26px] font-semibold'>
                                    {formatPrice(item.price)}
                                </p>
                                <button
                                    className='text-white bg-primary-orange rounded-[32px] px-6 py-3 mt-[27px] font-medium'
                                    onClick={() => {
                                        setOpenDetails(true);
                                        setSelectedId(item.id);
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