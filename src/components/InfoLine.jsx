export default function InfoLine({ margin, locale }) {
    const isUz = locale === 'uz';

    const info = [
        {
            title: '10+',
            subTitle: isUz ? 'Yillik tajriba' : 'Лет опыта',
        },
        {
            title: '5000+',
            subTitle: isUz ? 'Berilgan zakazlar' : 'Выполненных заказов',
        },
        {
            title: '24',
            subTitle: isUz ? 'Soat ichida javob kafolati' : 'Гарантия ответа в течение 24 часов',
        },
    ];

    return (
        <div className={`infoLine mt-[${margin ? `${margin}px` : '90px'}]`}>
            <div className="container">
                <div className="box flex items-center justify-between py-[50px] bg-primary-orange px-[57.5px] rounded-[10px]">
                    {info.map((item, index) => (
                        <div className="box text-white" key={index}>
                            <h4 className="text-5xl leading-[56px] font-bold">{item.title}</h4>
                            <p className="leading-[56px] text-[28px]">{item.subTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};