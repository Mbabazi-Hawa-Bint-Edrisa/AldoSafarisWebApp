import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import Register from "@/components/pages/Register";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Register || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function RegisterPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Register />
        <FooterOne />
      </main>
    </>
  );
}
