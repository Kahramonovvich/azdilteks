import Header from "@/components/Header";
import OurProducts from "@/components/OurProducts";
import AboutUs from "@/components/AboutUs";
import Partners from "@/components/Partners";
import InfoLine from "@/components/InfoLine";
import Comments from "@/components/Comments";
import OurServices from "@/components/OurServices";
import CallMe from "@/components/CallMe";
import { products } from "../../../products";

export default async function HomePage({ params, searchParams }) {

  const { locale } = await params;
  const { gender, industry } = await searchParams;

  let selectedProducts = [];
  if (gender) {
    selectedProducts = products.filter((item) => item.sex === gender);
  };
  if (!gender) {
    selectedProducts = products.filter((item) => item.sex === 'men');
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