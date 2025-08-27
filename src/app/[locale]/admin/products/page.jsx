import ProductsTable from '@/components/admin/ProductsTable';

export default async function ProductsPage({ params }) {

    const { locale } = await params;

    return (
        <div>
            <ProductsTable locale={locale} />
        </div>
    );
};