import OrderComponent from "@/components/admin/OrderComponent";

export default async function OrdersPage({ params }) {

    const { locale } = await params;

    return (
        <div>
            <OrderComponent locale={locale} />
        </div>
    );
};