import React from "react";

export default function PageHeader() {
  return (
    <div className="container">
      <div className="row justify-between py-30 mt-80">
        <div className="col-auto">
          <div className="text-14">
            Home {">"} Tours {">"} Destinations
          </div>
        </div>

        <div className="col-auto">
          <div className="text-14">THE BEST Tours & Excursions</div>
        </div>
      </div>
    </div>
  );
}
