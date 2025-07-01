'use client'
import { clothesCategory } from '@/constants/constants';
import MinusIcon from '@/icons/minus.svg'
import ArrowLink from '@/icons/cat Arrow.svg'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { formatPrice } from '@/utils/utils';

const getMinMaxPrices = (products) => {
    if (!products || products.length === 0) return { min: 0, max: 0 };

    const prices = products.map((product) =>
        product.discount ? product.newPrice : product.price
    );

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
};

export default function Filter({ gender, priceFrom, priceTo, type, typedProducts }) {

    const router = useRouter();
    const params = new URLSearchParams();

    const { min, max } = getMinMaxPrices(typedProducts);

    const [value, setValue] = useState([min, max]);

    const handleType = (slug) => {
        if (slug) params.set('type', slug);
        if (priceFrom) params.set('priceFrom', priceFrom);
        if (priceTo) params.set('priceTo', priceTo);
        const href = `/catalog${gender ? `/${gender}` : ''}?${params}`;
        router.push(href);
    };

    const handlePrice = (short, long) => {
        if (type) params.set('type', type);
        if (short) params.set('priceFrom', short);
        if (long) params.set('priceTo', long);
        const href = `/catalog${gender ? `/${gender}` : ''}?${params}`;
        router.push(href);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFinalChange = (event, newValue) => {
        const prices = newValue;
        const short = Math.min(...prices);
        const long = Math.max(...prices);
        handlePrice(short, long);
    };

    useEffect(() => {
        if (priceFrom && priceTo) {
            setValue([priceFrom, priceTo]);
        } else {
            setValue([min, max]);
        };
    }, [priceFrom, priceTo, type]);

    return (
        <div className="filterContent">
            <div className="type">
                <div className="top flex items-center justify-between pb-3 border-b">
                    <p className='text-lg leading-[26px]'>
                        Mahsulot turi
                    </p>
                    <MinusIcon />
                </div>
                <ul className="flex flex-col gap-y-3 mt-4">
                    {clothesCategory.map((item) => (
                        <li key={item.id}>
                            <button
                                className="flex items-center justify-between w-full"
                                onClick={() => handleType(item.slug)}
                            >
                                {item.name}
                                <ArrowLink className='text-black' />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="price mt-6">
                <div className="top flex items-center justify-between">
                    <p className='text-lg leading-[26px]'>
                        Narx
                    </p>
                    <MinusIcon />
                </div>
                <div className="bottom mt-4">
                    <div className="flex items-center justify-center">
                        <Slider
                            value={value}
                            onChange={handleChange}
                            onChangeCommitted={handleFinalChange}
                            min={min}
                            max={max}
                            step={10000}
                            valueLabelDisplay="auto"
                            sx={{
                                p: 0,
                                height: 2,
                                width: '95%',
                                color: '#F43D01',
                                '& .MuiSlider-thumb': {
                                    width: 12,
                                    height: 12,
                                    backgroundColor: '#F43D01',
                                    boxShadow: 'none',
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: 'none',
                                    },
                                    '&::before': {
                                        boxShadow: 'none',
                                    },
                                },
                                '& .MuiSlider-valueLabel': {
                                    display: 'none',
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#F43D01',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#E5E5E5',
                                },
                            }}
                        />
                    </div>
                    <div className="prices flex justify-between mt-2.5">
                        <p className='text-xs leading-[18px]'>
                            {formatPrice(value[0])}
                        </p>
                        <p className='text-xs leading-[18px]'>
                            {formatPrice(value[1])}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};