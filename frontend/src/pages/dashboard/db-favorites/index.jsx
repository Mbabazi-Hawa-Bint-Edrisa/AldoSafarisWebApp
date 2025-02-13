import Favorites from "@/components/dasboard/Fevorite";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-favorites || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function DBFavoritesPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Favorites />
      </main>
    </>
  );
}
