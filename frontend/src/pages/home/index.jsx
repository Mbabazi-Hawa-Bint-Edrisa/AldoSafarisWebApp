import Features10 from "@/components/homes/features/Features10";
import Features11 from "@/components/homes/features/Features11";
import Popular_things from "@/components/homes/features/Features9";
import Hero from "@/components/homes/heros/Hero10";
import Tour from "@/components/homes/tours/Tour";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/header/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Aldo Safaris - Travel & Tour  ",
  description: "Aldo Safaris - Travel & Tour  ",
};

export default function HomePage10() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header />
        <Hero />
        <Tour />
        <Popular_things  />
        <Features10 />
        <Features11 />
        <Footer/>
      </main>
    </>
  );
}
