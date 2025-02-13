import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import PageHeader from "@/components/tours/PageHeader";
import TourList3 from "@/components/tours/TourList3";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Tour-list-4 || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function TourListPage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />
        <TourList3 />
        <FooterOne />
      </main>
    </>
  );
}
