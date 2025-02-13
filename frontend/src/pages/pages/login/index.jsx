import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import Login from "@/components/pages/Login";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function LoginPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Login />
        <FooterOne />
      </main>
    </>
  );
}
