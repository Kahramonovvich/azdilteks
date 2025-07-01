import Header from "@/components/Header";
import OurProducts from "@/components/OurProducts";
import { products } from "../../products";
import AboutUs from "@/components/AboutUs";
import Partners from "@/components/Partners";
import InfoLine from "@/components/InfoLine";
import Comments from "@/components/Comments";
import OurServices from "@/components/OurServices";
import CallMe from "@/components/CallMe";

export default async function HomePage({ searchParams }) {

  const selectedSex = await searchParams.gender;
  const selectedIndustry = await searchParams.industry;

  let selectedProducts = [];
  if (selectedSex) {
    selectedProducts = products.filter((item) => item.sex === selectedSex);
  };
  if (!selectedSex) {
    selectedProducts = products.filter((item) => item.sex === 'men');
  };
  if (selectedIndustry) {
    selectedProducts = selectedProducts.filter((item) => item.industry === selectedIndustry);
  };

  return (
    <div className='homePage'>
      <Header />
      <OurProducts
        selectedIndustry={selectedIndustry}
        selectedSex={selectedSex}
        selectedProducts={selectedProducts}
      />
      <AboutUs />
      <Partners />
      <InfoLine />
      <Comments />
      <OurServices />
      <CallMe />
    </div>
  );
};