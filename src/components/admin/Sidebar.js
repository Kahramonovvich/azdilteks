'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Boxes, ShoppingCart, LayoutDashboard, ChevronLeft, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

const nav = [
    { href: '/admin', label: 'Админы', icon: Shield },
    { href: '/admin/products', label: 'Продукты', icon: Boxes },
    { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
    { href: '/admin/callMe', label: 'Оратная связь', icon: Smartphone },
];

export default function Sidebar({ open, setOpen }) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024 && open) {
            setOpen(false);
        }
    }, [pathname]);

    const Item = ({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/admin' && pathname?.startsWith(href));
        return (
            <Link
                href={href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
          ${active
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setOpen(false)}
            >
                <Icon className="h-5 w-5" />
                {expanded && <span className="truncate">{label}</span>}
            </Link>
        );
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/30 lg:hidden transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setOpen(false)}
            />
            <aside
                className={`
          fixed z-50 top-0 left-0 h-screen bg-white shadow-lg border-r border-gray-200
          transition-transform lg:static lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
          ${expanded ? 'w-64' : 'w-20'}
        `}
            >
                <div className="flex items-center justify-between gap-2 p-4">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-orange-600" />
                        {expanded && <span className="font-semibold">Admin Panel</span>}
                    </div>

                    <button
                        className="hidden lg:grid place-items-center h-8 w-8 rounded-lg hover:bg-gray-100"
                        onClick={() => setExpanded((v) => !v)}
                        title={expanded ? 'Свернуть' : 'Развернуть'}
                    >
                        <ChevronLeft
                            className={`h-5 w-5 transition ${expanded ? '' : 'rotate-180'}`}
                        />
                    </button>
                </div>

                <nav className="px-3 space-y-1">
                    {nav.map((n) => (
                        <Item key={n.href} {...n} />
                    ))}
                </nav>
            </aside>
        </>
    );
};