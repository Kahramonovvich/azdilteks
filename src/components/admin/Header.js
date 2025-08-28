'use client';
import axios from 'axios';
import { Menu, LogOut, User, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header({ onToggleSidebar }) {

    const router = useRouter();

    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: подключи поиск
        // например router.push(`/admin/search?q=${encodeURIComponent(query)}`)
    };

    const handleLogout = async () => {
        await axios.post('/api/auth/log-out');
        router.push('/login');
        console.log('logout...');
    };

    const handleProfile = () => {
        // TODO: переход в профиль
        // router.push('/admin/profile')
        console.log('profile...');
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4">
            {/* Бургер (мобилка) */}
            <button
                className="grid h-10 w-10 place-items-center rounded-lg hover:bg-gray-100 lg:hidden"
                onClick={onToggleSidebar}
                aria-label="Открыть меню"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Поиск */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-orange-500"
                    placeholder="Поиск по админке…"
                />
            </form>

            {/* Меню пользователя */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleProfile}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    title="Профиль"
                >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Профиль</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-700"
                    title="Выйти"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Выход</span>
                </button>
            </div>
        </header>
    );
};