import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/header/Header";
import Hero from "@/components/pages/destinations/Hero";
import TourList from "@/components/pages/destinations/TourList";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Destinations || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function DestinationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header />
        <Hero />

        <TourList />

        <Footer />
      </main>
    </>
  );
}
