const info = [
    { title: '10+', subTitle: 'Yillik tajriba' },
    { title: '5000+', subTitle: 'Berilgan zakazlar' },
    { title: '24', subTitle: 'Soat ichida javob kafolati' },
];

export default function InfoLine() {
    return (
        <div className="infoLine mt-[90px]">
            <div className="container">
                <div className="box flex items-center justify-between py-[50px] bg-primary-orange px-[57.5px] rounded-[10px]">
                    {info.map((item, index) => (
                        <div
                            className="box text-white"
                            key={index}
                        >
                            <h4 className="text-5xl leading-[56px] font-bold">{item.title}</h4>
                            <p className="leading-[56px] text-[28px]">{item.subTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};