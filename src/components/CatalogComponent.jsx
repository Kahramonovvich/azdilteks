'use client'
import { useGlobalContext } from '@/contexts/contexts';
import FilterIcon from '@/icons/setting-5.svg'
import { formatPrice } from '@/utils/utils';
import Image from 'next/image';
import { toast } from 'react-toastify';
import CloseIcon from '@/icons/close.svg'
import Filter from './Filter';
import { useRouter } from 'nextjs-toploader/app'
import { Pagination, PaginationItem } from '@mui/material';
import PagPrevIcon from '@/icons/pag prev.svg'
import PagNextIcon from '@/icons/pag next.svg'
import Link from 'next/link';

export default function CatalogComponent({
    gender,
    type,
    priceFrom,
    priceTo,
    filteredProducts,
    typedProducts,
    page,
    locale
}) {

    const router = useRouter();
    const { openFilter, setOpenFilter, setOpenDetails, setSelectedId } = useGlobalContext();

    const isUz = locale === 'uz';
    const productsPerView = openFilter ? 9 : 12;
    const totalPages = Math.ceil(filteredProducts.length / productsPerView);
    const startIndex = ((Number(page) || 1) - 1) * productsPerView;
    const endIndex = startIndex + productsPerView;
    const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

    const handleResetFilter = () => {
        const href = `/${locale}/catalog${gender ? `/${gender}` : ''}`;
        router.push(href);
    };

    const onPageChange = (event, value) => {
        const params = new URLSearchParams();
        if (type) params.set('type', type);
        if (priceFrom) params.set('priceFrom', priceFrom);
        if (priceTo) params.set('priceTo', priceTo);
        if (value) params.set('page', value);
        const href = `/${locale}/catalog${gender ? `/${gender}` : ''}?${params}`;
        router.push(href);
    };

    return (
        <div className="catalogComponent overflow-hidden">
            <div className="top flex items-center justify-between my-8 relative">
                <h3 className="lg:text-[32px] lg:leading-10 text-2xl">
                    {gender === 'men'
                        ? isUz ? 'Erkaklar uchun' : 'Для мужчин'
                        : gender === 'woman'
                            ? isUz ? 'Ayollar uchun' : 'Для женщин'
                            : isUz ? 'Katalog' : 'Каталог'}
                </h3>
                <button
                    className={`flex items-center gap-x-1.5 lg:px-4 lg:py-3 p-2 lg:h-[50px] border rounded-3xl font-medium
                        transition-all duration-300 ease-in-out absolute right-0
                        ${!openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={() => setOpenFilter(true)}
                >
                    {isUz ? 'Filter' : 'Фильтр'}
                    <FilterIcon />
                </button>
                <div className={`box flex items-center justify-between h-[50px] transition-all duration-300 ease-in-out lg:w-[282px] bg-white
                    absolute lg:relative w-full ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <button className='flex items-center gap-x-3'
                        onClick={() => setOpenFilter(false)}
                    >
                        <CloseIcon />
                        <p className='text-xl'>{isUz ? 'Filter' : 'Фильтр'}</p>
                    </button>
                    <button
                        className='text-primary-orange text-xs underline'
                        onClick={handleResetFilter}
                    >
                        {isUz ? 'Filterni tozalash' : 'Сбросить фильтр'}
                    </button>
                </div>
            </div>
            <div className="bottom relative">
                <div className={`flex ${openFilter ? 'lg:gap-x-11' : ''}`}>
                    <div className={`flex-1 grid lg:gap-x-6 gap-x-3 lg:gap-y-8 gap-y-4
                        ${openFilter ? 'lg:grid-cols-3 grid-cols-2' : 'lg:grid-cols-4 grid-cols-2'}`}
                    >
                        {currentPageProducts?.map((item) => (
                            <div key={item.productId} className="box overflow-hidden">
                                <div className="img relative bg-[#F6F6F6] border rounded-[22px] aspect-[0.93] overflow-hidden">
                                    <Image
                                        fill
                                        src={`/api/img?src=${encodeURIComponent(item?.imageLink)}`}
                                        alt={item.name}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="text mt-2.5">
                                    <Link
                                        href={`/${locale}/catalog/product/${item.productId}`}
                                        className='font-medium truncate lg:text-[22px] lg:leading-[25px] block'
                                    >
                                        {item.name}
                                    </Link>
                                    <p className='text-primary-orange font-semibold lg:text-lg text-sm leading-none mt-2.5'>
                                        {formatPrice(item.price)}
                                    </p>
                                </div>
                                <button
                                    className='font-medium lg:text-lg lg:leading-[21px] text-sm bg-primary-orange lg:px-4 lg:py-2 w-full p-2 lg:w-auto mt-2.5 text-white rounded-[20px]'
                                    onClick={() => {
                                        setOpenDetails(true);
                                        setSelectedId(item.productId);
                                    }}
                                >
                                    {isUz ? "Savatga qo’shish +" : "Добавить в корзину +"}
                                </button>
                            </div>
                        ))}
                        <div className={`pagination flex items-center justify-center ${openFilter ? 'lg:col-span-3 col-span-2' : 'lg:col-span-4 col-span-2'}`}>
                            <Pagination
                                count={totalPages}
                                siblingCount={1}
                                boundaryCount={1}
                                page={Number(page) || 1}
                                renderItem={(item) => (
                                    <PaginationItem
                                        {...item}
                                        slots={{
                                            previous: () => (
                                                <span className="flex items-center gap-1">
                                                    <PagPrevIcon />
                                                    <span className="hidden sm:inline">
                                                        {isUz ? "Oldingi" : "Назад"}
                                                    </span>
                                                </span>
                                            ),
                                            next: () => (
                                                <span className="flex items-center gap-1">
                                                    <span className="hidden sm:inline">
                                                        {isUz ? "Keyingi" : "Вперёд"}
                                                    </span>
                                                    <PagNextIcon />
                                                </span>
                                            ),
                                        }}
                                    />
                                )}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        border: '1px solid #E5E5E5',
                                        margin: 0,
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        fontFamily: 'inherit',
                                    },
                                    '& .MuiPaginationItem-root.Mui-selected': {
                                        backgroundColor: '#F43D01',
                                        color: '#fff',
                                        border: 'none',
                                        '&:hover': {
                                            backgroundColor: '#F43D01',
                                        },
                                    },
                                    '& .MuiPaginationItem-previousNext': {
                                        border: 'none',
                                    },
                                    '& .MuiPagination-ul': {
                                        columnGap: '12px',
                                    },
                                    '& .MuiPaginationItem-ellipsis': {
                                        border: 'none'
                                    },
                                    '@media (max-width: 640px)': {
                                        '& .MuiPagination-ul': {
                                            columnGap: '8px'
                                        },
                                        '& .MuiPaginationItem-previousNext': {
                                            border: '1px solid #E5E5E5',
                                            width: '32px'
                                        },
                                    }
                                }}
                                onChange={onPageChange}
                            />
                        </div>
                    </div>
                    <div className={`filter lg:w-[282px] w-full absolute right-0 ${openFilter ? 'lg:relative' : 'lg:absolute'}`}>
                        <div className={`filterBox lg:w-[282px] w-full bg-white duration-300 ease-in-out transition-all
                            ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                        >
                            <Filter
                                type={type}
                                priceFrom={priceFrom}
                                priceTo={priceTo}
                                gender={gender}
                                typedProducts={typedProducts}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};