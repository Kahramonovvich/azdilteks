import CallMeTable from '@/components/admin/CallMeTable';
import React from 'react'

export default async function CallMePage({ params }) {

    const { locale } = await params;

    return (
        <div>
            <CallMeTable locale={locale} />
        </div>
    );
};