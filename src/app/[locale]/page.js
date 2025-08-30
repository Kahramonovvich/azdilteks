import Header from "@/components/Header";
import OurProducts from "@/components/OurProducts";
import AboutUs from "@/components/AboutUs";
import Partners from "@/components/Partners";
import InfoLine from "@/components/InfoLine";
import Comments from "@/components/Comments";
import OurServices from "@/components/OurServices";
import CallMe from "@/components/CallMe";

export default async function HomePage({ params, searchParams }) {

  const { locale } = await params;
  const { gender, industry } = await searchParams;


  let products = [];

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/Product?language=${locale}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 600, tags: ['products'] },
    });
    if (!res.ok) throw new Error('Failed');
    products = await res.json();
  } catch (e) {
    console.error(e);
  };

  let selectedProducts = [];
  
  if (gender) {
    selectedProducts = products?.filter((item) => item.gender === gender);
  };
  if (!gender) {
    selectedProducts = products?.filter((item) => item.gender === 'men');
  };
  if (industry) {
    selectedProducts = selectedProducts.filter((item) => item.industry === industry);
  };

  return (
    <div className='homePage'>
      <Header
        locale={locale} />
      <OurProducts
        selectedIndustry={industry}
        selectedSex={gender}
        selectedProducts={selectedProducts}
        locale={locale}
      />
      <AboutUs
        locale={locale} />
      <Partners
        locale={locale} />
      <InfoLine
        locale={locale} />
      <Comments
        locale={locale} />
      <OurServices
        locale={locale} />
      <CallMe
        locale={locale} />
    </div>
  );
};