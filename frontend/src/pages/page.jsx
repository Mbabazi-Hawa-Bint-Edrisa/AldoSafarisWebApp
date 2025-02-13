import React from "react";
import Firstpage from "./(homes)/home-1/page";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function page() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Firstpage />
    </>
  );
}
