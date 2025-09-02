export default function InfoLine({ margin, locale }) {
    const isUz = locale === 'uz';

    const info = [
        {
            title: '25+',
            subTitle: isUz ? 'Yillik tajriba' : 'Лет опыта',
        },
        {
            title: '1.000.000+',
            subTitle: isUz ? 'Berilgan buyurtmalar' : 'Выполненных заказов',
        },
        {
            title: '24',
            subTitle: isUz ? 'Soat ichida javob kafolati' : 'Гарантия ответа в течение 24 часов',
        },
    ];

    return (
        <div className={`infoLine lg:mt-[${margin ? `${margin}px` : '90px'}] mt-5`}>
            <div className="container">
                <div className="box flex lg:flex-row flex-col lg:items-center justify-between gap-y-3 lg:py-[50px] bg-primary-orange lg:px-[57.5px] p-3 rounded-[10px]">
                    {info.map((item, index) => (
                        <div className="box text-white" key={index}>
                            <h4 className="lg:text-5xl text-2xl lg:leading-[56px] font-bold">{item.title}</h4>
                            <p className="lg:leading-[56px] lg:text-[28px]">{item.subTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};