import RotateIcon from '@/icons/refresh-rotate.svg'
import SecurityIcon from '@/icons/shield-chekmark.svg'
import TruckIcon from '@/icons/truck-2.svg'

export default function OurServices() {

    const info = [
        {
            icon: <RotateIcon />,
            title: 'Bepul qaytish',
            subTitle: 'Our customers can return or exchange their purchases hassle-free, with our easy-to-use return policy.'
        },
        {
            icon: <SecurityIcon />,
            title: 'Xavfsiz to`lov',
            subTitle: 'Our customers can return or exchange their purchases hassle-free, with our easy-to-use return policy.'
        },
        {
            icon: <TruckIcon />,
            title: 'Vaqtida yetkazish',
            subTitle: 'Our customers can return or exchange their purchases hassle-free, with our easy-to-use return policy.'
        },
    ];

    return (
        <div className="ourServices mt-[90px]">
            <div className="container">
                <div className="grid grid-cols-4 gap-x-6">
                    <div className="box">
                        <h3 className="text-5xl leading-[56px]">
                            Bizning xizmatlarimiz
                        </h3>
                        <p className="font-medium text-[#525252] mt-4">
                            Biz uzluksiz va yoqimli xarid qilish tajribasi muhimligini tushunamiz.
                        </p>
                    </div>
                    {info.map((item, index) => (
                        <div
                            key={index}
                            className="box border rounded-3xl p-4 flex flex-col gap-y-3"
                        >
                            {item.icon}
                            <p className='text-2xl'>
                                {item.title}
                            </p>
                            <p className='text-[#525252]'>
                                {item.subTitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};