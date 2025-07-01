'use client'
import { navMenu } from '@/constants/constants'
import Logo from '@/icons/Logo.svg'
import Link from 'next/link'
import SearchIcon from '@/icons/Icon - Search.svg'
import BagIcon from '@/icons/bag-2.svg'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '@/icons/close.svg'
import DeleteIcon from '@/icons/small close.svg'
import CallBackModal from './CallBackModal'
import { useGlobalContext } from '@/contexts/contexts'

export default function NavBar() {

    const router = useRouter();
    const inputRef = useRef(null);

    const { setCallBackModal } = useGlobalContext();

    const [focused, setFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searched, setSearched] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setFocused(false);
        setSearched((prev) => {
            const updated = [searchTerm, ...prev?.filter((term) => term !== searchTerm)].slice(0, 10);
            return updated;
        });
        setSearchTerm('');
        router.push(`/search/${searchTerm}`);
    };

    useEffect(() => {
        const stored = localStorage.getItem('searchHistory');
        if (stored) {
            setSearched(JSON.parse(stored));
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searched));
    }, [searched]);

    useEffect(() => {
        if (focused && inputRef.current) {
            inputRef.current.focus();
        };
        if (focused) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
        return () => {
            document.body.style.overflow = '';
        };
    }, [focused]);

    return (
        <nav className={`nav relative py-6`}>
            <CallBackModal />
            <div className="container">
                <div className="flex items-center justify-between">
                    <Link
                        href={'/'}
                        className="logo">
                        <Logo />
                    </Link>
                    <div className="center flex items-center gap-x-12">
                        {navMenu.map((item) => (
                            <div
                                key={item.id}
                                className={`relative group`}
                            >
                                <Link
                                    href={item.href}
                                    className='font-medium'
                                >
                                    {item.menu}
                                </Link>

                                {item.href === '/catalog' && (
                                    <div
                                        className="absolute overflow-hidden top-full right-1/2 translate-x-1/2 mt-4 z-20 opacity-0 invisible
                                            group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out
                                            bg-white border rounded-3xl w-max shadow-md"
                                    >
                                        <Link
                                            className="block px-5 py-3 font-medium hover:bg-slate-100"
                                            href="/catalog/men"
                                        >
                                            Erkaklar uchun
                                        </Link>
                                        <Link
                                            className="block px-5 py-3 font-medium hover:bg-slate-100"
                                            href="/catalog/woman"
                                        >
                                            Ayollar uchun
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={`flex items-center gap-x-2`}>
                        <form
                            onSubmit={handleSearch}
                            className={`border rounded-3xl px-4 h-12 flex items-center gap-x-2 w-[205px] overflow-hidden transition-all duration-300
                                ${focused ? 'opacity-0' : ''}`}
                        >
                            <div className='flex items-center justify-center'>
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                className='outline-none w-full h-full flex-1 text-sm leading-[22px] bg-white'
                                placeholder='Qidirish...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                onFocus={() => { setFocused(true); }}
                                disabled={focused}
                            />
                        </form>
                        <Link
                            className="box border rounded-full flex items-center justify-center w-12 h-12"
                            href={'/basket'}
                        >
                            <BagIcon />
                        </Link>
                        <button
                            className="box px-6 h-12 bg-primary-orange rounded-[20px] text-white font-medium text-sm leading-[22px]"
                            onClick={() => setCallBackModal(true)}
                        >

                            Bog’lanish
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`h-screen absolute top-full z-10 left-0 w-full bg-[#171717] bg-opacity-[0.08] backdrop-blur-sm transition-opacity duration-300
                    ${!focused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className={`bg-white py-8 border-t`}>
                    <div className="container">
                        <div className={`box flex items-center gap-x-3`}>
                            <form
                                className={`border rounded-3xl px-4 h-14 flex items-center gap-x-2 flex-1 overflow-hidden`}
                                onSubmit={handleSearch}
                            >
                                <div className='flex items-center justify-center'>
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    className='outline-none w-full h-full flex-1 text-sm leading-[22px]'
                                    placeholder='Qidirish...'
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                />
                            </form>
                            <button
                                className="h-14 w-14 rounded-full border flex items-center justify-center"
                                onClick={() => {
                                    setFocused(false);
                                    setSearchTerm('');
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        {searched?.length > 0 && (
                            <div className="bottom mt-8">
                                <p className='font-bold mb-4'>O’xirgi qidirilgan</p>
                                <div
                                    className="box flex items-center gap-x-3 overflow-hidden"
                                >
                                    {searched?.map((item, index) => (
                                        <div
                                            key={index}
                                            className='box border py-2 px-6 rounded-3xl flex items-center gap-x-2 whitespace-nowrap'
                                        >
                                            <button
                                                onClick={() => router.push(`/search/${item}`)}
                                            >
                                                {item}
                                            </button>
                                            <button
                                                onClick={() => setSearched((prev) => {
                                                    const updated = [...prev.filter((term) => term !== item)];
                                                    return updated;
                                                })}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};