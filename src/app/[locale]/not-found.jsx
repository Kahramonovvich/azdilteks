import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ой! Здесь ничего нет</h1>
            <p className="text-gray-600 mb-6 max-w-md">
                Кажется, вы зашли не туда. Но не волнуйтесь — мы поможем вернуться. 🙂
            </p>
            <Link href="/" passHref
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-full transition">
                Вернуться на главную
            </Link>
        </main>
    );
};