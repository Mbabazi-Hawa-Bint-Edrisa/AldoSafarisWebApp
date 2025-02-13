import React from "react";

export default function Included({ included }) {
  if (!included || typeof included !== "object") {
    return <div>No details available.</div>;
  }

  const items = [
    { label: "Beverages, drinking water, morning tea and buffet lunch", key: "beverages" },
    { label: "Local taxes", key: "localTaxes" },
    { label: "Hotel pickup and drop-off by air-conditioned minivan", key: "hotelPickup" },
    { label: "Insurance/Transfer to a private pier", key: "insurance" },
    { label: "Soft drinks", key: "softDrinks" },
    { label: "Tour Guide", key: "guide" },
    { label: "Towel", key: "towel" },
    { label: "Tips", key: "tips" },
    { label: "Alcoholic Beverages", key: "alcoholicBeverages" },
  ];

  // Separate included (true) and excluded (false) items
  const includedItems = items.filter((item) => included[item.key]);
  const excludedItems = items.filter((item) => !included[item.key]);

  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      {/* Included Items */}
      <div className="col-lg-6">
        <div className="y-gap-15">
          {includedItems.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
              {elm.label}
            </div>
          ))}
        </div>
      </div>

      {/* Excluded Items */}
      <div className="col-lg-6">
        <div className="y-gap-15">
          {excludedItems.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-cross flex-center text-10 size-24 rounded-full text-red-3 bg-red-4 mr-15"></i>
              {elm.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
