import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-add-tour || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function DBAddTourPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddTour />
      </main>
    </>
  );
}
