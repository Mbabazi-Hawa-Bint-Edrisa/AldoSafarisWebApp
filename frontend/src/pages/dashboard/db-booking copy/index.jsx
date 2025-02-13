import DbBooking from "@/components/dasboard/DbUserBooking";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-booking || Aldo Safaris",
  description: "Aldo Safaris",
};

export default function DBBookingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DbBooking />
      </main>
    </>
  );
}
