import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import ContactForm from "@/components/pages/contact/ContactForm";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function ContactPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <ContactForm />
        <FooterOne />
      </main>
    </>
  );
}
