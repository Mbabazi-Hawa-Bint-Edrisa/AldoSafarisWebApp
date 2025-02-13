import React, { useEffect, useState } from "react";
import Stars from "@/components/common/Stars";
import { Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export default function TourList() {
  const [tours, setTours] = useState([]); // Tour data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tours from the backend API
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/tours/list_tours`);
        setTours(response.data); // Set the fetched tours
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to fetch tours.");
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Display loading or error states
  if (loading) return <div>Loading tours...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end mb-50">
          <div className="col-auto">
            <h2 className="text-30">Explore all Trips {new Date().getFullYear()}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-8">
            <div className="row y-gap-30 pt-30">
              {tours.map((tour) => (
                <div className="col-12" key={tour.id}>
                  <div className="tourCard -type-2">
                    {/* Image Section */}
                    <div className="tourCard__image">
                      <img
                        src={`${baseURL}${tour.image1 || "/static/uploads/placeholder.png"}`}
                        alt={tour.title || "Tour"}
                      />
                      <div className="tourCard__favorite">
                        <button className="button -accent-1 size-35 bg-white rounded-full flex-center">
                          <i className="icon-heart text-15"></i>
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="tourCard__content">
                      <div className="tourCard__location">
                        <i className="icon-pin"></i>
                        {tour.country}, {tour.district}
                      </div>

                      <h3 className="tourCard__title mt-5">
                        <span>{tour.title}</span>
                      </h3>

                      <div className="d-flex items-center mt-5">
                        <div className="d-flex items-center x-gap-5">
                          <Stars star={4.5} font={12} /> {/* Example rating */}
                        </div>
                        <div className="text-14 ml-10">
                          <span className="fw-500">4.5</span> (200) {/* Example */}
                        </div>
                      </div>

                      <p className="tourCard__text mt-5">{tour.content}</p>
                    </div>

                    {/* Info Section (Right-Aligned) */}
                    <div className="tourCard__info" style={{ textAlign: "right" }}>
                      <div>
                        {/* Duration */}
                        <div className="d-flex items-center text-14">
                          <i className="icon-clock mr-10"></i>
                          3 Days {/* Fixed duration */}
                        </div>

                        {/* Price Section */}
                          <div className="d-flex items-center mt-5">
                            
                            <span className="text-20 fw-700 ml-5">
                              ${tour.price}
                            </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button className="button -outline-accent-1 text-accent-1 mt-10">
                        <Link to={`/tour-single/${tour.id}`}>
                          View Details
                        </Link>
                        <i className="icon-arrow-top-right ml-10"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
