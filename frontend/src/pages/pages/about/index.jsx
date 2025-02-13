import FeaturesOne from "@/components/homes/features/FeaturesOne";
import FeturesTwo from "@/components/homes/features/FeturesTwo";
import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import Hero from "@/components/pages/about/Hero";
import Information from "@/components/pages/about/Information";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function AboutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Hero />
        <Information />
        <FeaturesOne />
        <div className="mt-60">
          <FeturesTwo />
        </div>
        <FooterOne />
      </main>
    </>
  );
}
