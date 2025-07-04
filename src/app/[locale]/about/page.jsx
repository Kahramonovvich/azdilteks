import AboutUs from "@/components/AboutUs";
import InfoLine from "@/components/InfoLine";

export default async function AboutPage({ params }) {
    
    const { locale } = await params;
    const isUz = locale === 'uz';

    const info = isUz ? [
        {
            title: 'Sifatli va bardoshli materiallar',
            subTitle: 'Mahsulotlarimizda faqat sertifikatlangan va uzoq muddat xizmat qiluvchi matolardan foydalanamiz. Kiyimlar yuvishga, cho‘zilishga va kundalik ish sharoitlariga chidamli bo‘ladi. Bu esa mijozlarga uzoq vaqt davomida ishonchli foydalanish imkonini beradi.'
        },
        {
            title: 'Individual buyurtmalar bo‘yicha ishlash',
            subTitle: 'Har bir mijoz ehtiyojini inobatga olib, maxsus o‘lcham va dizayn asosida ishlab chiqamiz. Kiyimlarga logotip, ranglar va detallarni moslab tikish imkoniyati mavjud. Shaxsiy yondashuv har bir buyurtmani noyob qiladi.'
        },
        {
            title: 'O‘z vaqtida yetkazib berish',
            subTitle: "Buyurtmalar belgilangan muddat ichida yetkaziladi va bu bizning ustuvorligimizdir. Tizimli ishlab chiqarish jarayoni tufayli kechikishlar oldi olinadi. Mijoz vaqti biz uchun qadrlidir, shuning uchun va'damizga sodiqmiz."
        },
        {
            title: 'Moslashuvchan narx siyosati',
            subTitle: 'Turli byudjetlar uchun optimal yechimlar taklif qilamiz. Katta buyurtmalarda chegirmalar va bonus tizimi mavjud. Sifat va narx o‘rtasida ideal muvozanat saqlanadi.'
        },
        {
            title: 'Yagona dizayn va qulaylik',
            subTitle: 'Kiyimlarimiz zamonaviy dizayn va funksionallikni o‘zida jamlagan. Ishchilarning harakatlanishiga xalaqit bermaydigan ergonomik model yaratiladi. Shuningdek, ko‘rinishi ham jamoangiz imijiga ijobiy ta’sir ko‘rsatadi.'
        },
    ] : [
        {
            title: 'Качественные и прочные материалы',
            subTitle: 'Мы используем только сертифицированные и износостойкие ткани. Одежда устойчива к стирке, растяжению и повседневным условиям труда — надёжна в использовании долгие годы.'
        },
        {
            title: 'Работа по индивидуальным заказам',
            subTitle: 'Мы учитываем потребности каждого клиента и шьём по индивидуальным размерам и дизайну. Возможна вышивка логотипа, подбор цвета и деталей. Каждая форма — уникальна.'
        },
        {
            title: 'Своевременная доставка',
            subTitle: 'Заказы доставляются строго в срок благодаря налаженному производству. Время клиента для нас важно, и мы всегда держим своё слово.'
        },
        {
            title: 'Гибкая ценовая политика',
            subTitle: 'Мы предлагаем решения под разные бюджеты. Действуют скидки и бонусы при крупных заказах. Баланс между качеством и ценой — наш приоритет.'
        },
        {
            title: 'Единый стиль и комфорт',
            subTitle: 'Наша одежда сочетает современный дизайн и практичность. Эргономичный крой не мешает движению, а внешний вид положительно влияет на имидж вашей команды.'
        },
    ];

    return (
        <div className="aboutPage">
            <AboutUs margin={60} locale={locale} />

            <div className="container">
                <div className="textBox mt-[60px]">
                    <p className="font-medium text-lg leading-[26px]">
                        {isUz
                            ? "AZ & DIL TEKS — bu zamonaviy, ishonchli va sifatli kiyim-kechak mahsulotlarini ishlab chiqaruvchi va yetkazib beruvchi brend."
                            : "AZ & DIL TEKS — это современный, надёжный производитель и поставщик качественной спецодежды."}
                    </p>
                    <p className="py-6">
                        {isUz
                            ? "Kompaniyamiz restoranlar, shifoxonalar, ta’lim muassasalari, qurilish sohasi va boshqa ko‘plab yo‘nalishlar uchun maxsus kiyimlar ishlab chiqarishga ixtisoslashgan. Har bir mahsulotimiz yuqori sifatli matolardan tikiladi va mijozlarimiz talablariga mos tarzda tayyorlanadi."
                            : "Наша компания специализируется на производстве спецодежды для ресторанов, медицинских учреждений, образовательных организаций, строительной сферы и других направлений. Каждое изделие шьётся из качественных тканей с учётом требований клиента."}
                    </p>
                    {info.map((item, index) => (
                        <div key={index} className="box flex flex-col gap-y-2 mb-6">
                            <p className="font-medium text-lg leading-[26px]">{item.title}</p>
                            <p>{item.subTitle}</p>
                        </div>
                    ))}
                    <div className="box flex flex-col gap-y-2">
                        <p>
                            {isUz
                                ? "Biz o‘z mijozlarimiz bilan ishonchli va uzoq muddatli hamkorlik o‘rnatishni maqsad qilganmiz. Shuning uchun har bir buyurtmaga alohida yondashamiz va mijoz ehtiyojini birinchi o‘ringa qo‘yamiz."
                                : "Мы стремимся выстраивать долгосрочные и доверительные отношения с каждым клиентом. Поэтому к каждому заказу подходим индивидуально, учитывая ваши потребности."}
                        </p>
                        <p>
                            {isUz
                                ? <>Agar siz ham professional ko‘rinishdagi ishchi kiyimlarga ehtiyoj sezsangiz — <span className="font-bold">AZ & DIL TEKS</span> sizning ishonchli hamkoringiz bo‘la oladi!</>
                                : <>Если вам нужна профессиональная спецодежда — <span className="font-bold">AZ & DIL TEKS</span> станет вашим надёжным партнёром!</>}
                        </p>
                    </div>
                </div>
            </div>

            <InfoLine margin={60} locale={locale} />
        </div>
    );
};