'use client';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { formatPrice } from '@/utils/utils';
import { colors } from '@/constants/constants';

const STATUS = {
    1: { label: 'Yangi', classes: 'bg-blue-100 text-blue-800' },
    2: { label: 'Jarayonda', classes: 'bg-yellow-100 text-yellow-800' },
    3: { label: 'Tugatildi', classes: 'bg-green-100 text-green-800' },
};

export default function OrderMoreInfoModal({ order, products, openInfo, setOpenInfo }) {

    if (!order) return null;

    const close = () => setOpenInfo(false);

    const statusCfg = STATUS[order.status] || null;

    const items = (order.products || []).map(op => {
        const info = products?.find(p => p.productId === op.productId);
        return { ...op, info };
    });

    const colorFind = (col) => {
        colors.find((c) => c.slug === col);
    };

    console.log(colorFind('red'));

    return (
        <Modal open={openInfo} className='py-5'>
            <div className="relative h-full w-full">
                <div className="w-full max-h-full h-auto max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none overflow-y-scroll">

                    <div className="flex items-start justify-between">
                        <h2 className="text-xl font-semibold">Buyurtma #{order.cartId}</h2>
                        <IconButton onClick={close}><CloseIcon /></IconButton>
                    </div>

                    {statusCfg && (
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusCfg.classes}`}>
                            {statusCfg.label}
                        </div>
                    )}

                    <div className="space-y-2 text-sm">
                        <div><b>Mijoz:</b> {order.name}</div>
                        <div><b>Telefon:</b> {order.phoneNumber}</div>
                        <div><b>Tug‘ilgan sana:</b> {order.birthDate?.split('T')[0]}</div>
                        <div><b>Umumiy summa:</b> {formatPrice(order.totalPrice)}</div>
                    </div>

                    <div className="divide-y rounded-lg border">
                        {items.length === 0 && (
                            <div className="p-4 text-sm text-gray-500">Mahsulotlar yo‘q</div>
                        )}
                        {items.map((it, idx) => (
                            <div key={idx} className="p-4 flex items-center gap-4">
                                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    {it.info?.imageLink ? (
                                        <Image
                                            src={`/api/img?src=${it.info.imageLink}`}
                                            alt={it.info.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full grid place-items-center text-xs text-gray-400">No img</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium">{it.info?.name || `Mahsulot #${it.productId}`}</div>
                                    <div className="text-sm text-gray-600">
                                        O‘lcham: {it.size} | Rang: {it.colour} | Soni: {it.quantity}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-medium">{formatPrice(it.info?.price)}</div>
                                    <div className="text-xs text-gray-500">
                                        Jami: {formatPrice((it.info?.price || 0) * it.quantity)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <Button variant="outlined" onClick={close}>Yopish</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};