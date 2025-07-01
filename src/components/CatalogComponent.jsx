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

export default function CatalogComponent({ gender, type, priceFrom, priceTo, filteredProducts, typedProducts, page }) {

    const router = useRouter();

    const { openFilter, setOpenFilter, addToCart } = useGlobalContext();

    const productsPerView = openFilter ? 9 : 12;
    const totalPages = Math.ceil(filteredProducts.length / productsPerView);

    const startIndex = ((Number(page) || 1) - 1) * productsPerView;
    const endIndex = startIndex + productsPerView;
    const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

    const handleAdd = (id, size, color) => {
        const added = addToCart(id, { size, color });
        if (added) {
            toast.success("Mahsulot savatchaga qo`shildi!");
        } else {
            toast.warning("Bu mahsulot savatchada mavjud!");
        };
    };

    const handleResetFilter = () => {
        const href = `/catalog${gender ? `/${gender}` : ''}`;
        router.push(href);
    };

    const onPageChange = (event, value) => {
        const params = new URLSearchParams();
        if (type) params.set('type', type);
        if (priceFrom) params.set('priceFrom', priceFrom);
        if (priceTo) params.set('priceTo', priceTo);
        if (value) params.set('page', value);
        const href = `/catalog${gender ? `/${gender}` : ''}?${params}`;
        router.push(href);
    };

    return (
        <div className="catalogComponent overflow-hidden">
            <div className="top flex items-center justify-between my-8 relative">
                <h3 className="text-[32px] leading-10">
                    {gender === 'men' ? 'Erkaklar uchun' : gender === 'woman' ? 'Ayollar uchun' : 'Katalog'}
                </h3>
                <button
                    className={`flex items-center gap-x-1.5 px-4 py-3 h-[50px] border rounded-3xl font-medium transition-all duration-300 ease-in-out
                        absolute right-0 ${!openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={() => setOpenFilter(true)}
                >
                    Filter
                    <FilterIcon />
                </button>
                <div className={`box flex items-center justify-between h-[50px] transition-all duration-300 ease-in-out w-[282px] bg-white
                    ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <button className='flex items-center gap-x-3'
                        onClick={() => setOpenFilter(false)}
                    >
                        <CloseIcon />
                        <p className='text-xl'>Filter</p>
                    </button>
                    <button
                        className='text-primary-orange text-xs underline'
                        onClick={() => handleResetFilter()}
                    >
                        Reset Filter
                    </button>
                </div>
            </div>
            <div className="bottom relative">
                <div className={`flex ${openFilter ? 'gap-x-11' : ''}`}>
                    <div className={`flex-1 grid gap-x-6 gap-y-8 ${openFilter ? 'grid-cols-3' : 'grid-cols-4'}`}>
                        {currentPageProducts?.map((item) => (
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
                                    <p className='font-medium truncate text-[22px] leading-[25px]'>
                                        {item.name}
                                    </p>
                                    <p className='text-primary-orange font-semibold text-lg leading-none mt-2.5'>
                                        {formatPrice(item.price)}
                                    </p>
                                </div>
                                <button
                                    className='font-medium text-lg leading-[21px] bg-primary-orange px-4 py-2 mt-2.5 text-white rounded-[20px]'
                                    onClick={() => handleAdd(item.id, 'l', 'red')}
                                >
                                    Savatga qo’shish +
                                </button>
                            </div>
                        ))}
                        <div
                            className={`pagination flex items-center justify-center
                                ${openFilter ? 'col-span-3' : 'col-span-4'}`}
                        >
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
                                                    Oldingi
                                                </span>
                                            ),
                                            next: () => (
                                                <span className="flex items-center gap-1">
                                                    Keyingi
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
                                }}
                                onChange={onPageChange}
                            />
                        </div>
                    </div>
                    <div className={`filter w-[282px] right-0 ${openFilter ? 'relative' : 'absolute'}`}>
                        <div className={`filterBox w-[282px] bg-white duration-300 ease-in-out transition-all
                            ${openFilter ? 'translate-x-0' : 'translate-x-full'}`}
                        >
                            <Filter
                                type={type}
                                priceFrom={priceFrom}
                                priceTo={priceTo}
                                gender={gender}
                                typedProducts={typedProducts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};