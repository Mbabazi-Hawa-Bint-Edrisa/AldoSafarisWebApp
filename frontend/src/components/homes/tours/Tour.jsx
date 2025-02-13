import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Stars from "@/components/common/Stars";

const baseURL = "http://127.0.0.1:5000"; // Base URL for the backend server

export default function Tour2() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch tours from the backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${baseURL}/api/tours/list_tours`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading tours...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleTourClick = (tourId) => {
    // Redirect to /tour-single/:id
    navigate(`/tour-single/${tourId}`);
  };

  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-center y-gap-10">
          <div className="col-auto">
            <h2 className="text-30 sm:text-24 fw-600">Top Destinations</h2>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 pt-40 sm:pt-20"
        >
          {tours.map((tour, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6"
              style={{ cursor: "pointer" }}
              onClick={() => handleTourClick(tour.id)} // Navigate to tour-single/:id
            >
              <div className="tourCard -type-1 d-block border-1 bg-white hover-shadow-1 overflow-hidden rounded-12 bg-white -hover-shadow">
                <div className="tourCard__header">
                  <div className="tourCard__image ratio ratio-28:20">
                    <img
                      src={`${baseURL}${tour.image1 || "/static/uploads/placeholder.png"}`}
                      alt={tour.title}
                      className="img-ratio"
                    />
                  </div>

                  <button className="tourCard__favorite">
                    <i className="icon-heart"></i>
                  </button>
                </div>

                <div className="tourCard__content px-20 py-10">
                  <div className="tourCard__location d-flex items-center text-13 text-light-2">
                    <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                    {tour.district}, {tour.country}
                  </div>

                  <h3 className="tourCard__title text-16 fw-500 mt-5">
                    <span>{tour.title}</span>
                  </h3>

                  <div className="tourCard__rating text-13 mt-5">
                    <div className="d-flex items-center">
                      <div className="d-flex x-gap-5">
                        <Stars star={tour.rating || 4.5} />
                      </div>

                      <span className="text-dark-1 ml-10">
                        {tour.rating || 4.5} ({tour.ratingCount || 100})
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                    <div className="d-flex items-center">
                      <i className="icon-clock text-16 mr-5"></i>
                      {tour.duration || "N/A"}
                    </div>

                    <div>
                      From{" "}
                      <span className="text-16 fw-500">
                        ${tour.price?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
