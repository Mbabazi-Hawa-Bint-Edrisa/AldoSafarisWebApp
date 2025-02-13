import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Stars from "../common/Stars";
import Pagination from "../common/Pagination";

const baseURL = "http://127.0.0.1:5000";

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [tours, setTours] = useState([]); // Dynamic data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tours from the Flask API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/tours/list_tours`);
        setTours(response.data); // Set the fetched tours
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to fetch tours.");
        setLoading(false); // Stop loading
      }
    };

    fetchTours();
  }, []);

  // Display loading or error messages
  if (loading) return <div>Loading tours...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <Sidebar setSideBarOpen={setSideBarOpen} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content_content">
          <h1 className="text-30">My Listings</h1>
          <p className="">Explore the tours listed below:</p>

          <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">
            <div className="row y-gap-30">
              {tours.map((tour) => (
                <div key={tour.id} className="col-lg-6">
                  <div className="border-1 rounded-12 px-20 py-20">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      {/* Tour Image */}
                      <div className="col-xxl-auto">
                        <img
                          src={`${baseURL}${tour.image1 || "/static/uploads/placeholder.png"}`}
                          alt={tour.title}
                          className="size-200 w-1/1 object-cover rounded-12"
                        />
                      </div>

                      {/* Tour Details */}
                      <div className="col">
                        <div className="d-flex items-center">
                          <i className="icon-pin mr-5"></i>
                          {tour.country}, {tour.district}
                        </div>

                        <div className="text-18 lh-15 fw-500 mt-5">{tour.title}</div>

                        <div className="d-flex items-center mt-5">
                          <div className="d-flex x-gap-5 text-yellow-2 mr-10">
                            <Stars star={4.5} /> {/* Replace with actual rating if available */}
                          </div>
                          <div>4.5 (200)</div>
                        </div>

                        <div className="row y-gap-15 justify-between items-end pt-5">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <i className="icon-clock mr-5"></i>
                              <div className="text-14">Duration: 3 Days</div> {/* Placeholder */}
                            </div>
                          </div>

                          <div className="col-auto">
                            <div className="text-right md:text-left">
                              <div className="lh-14">${tour.price}</div>
                              From{" "}
                              <span className="text-20 fw-500">${tour.price + 100}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-30">
              <Pagination />
              <div className="text-14 text-center mt-20">
                Showing results {tours.length} of {tours.length}
              </div>
            </div>
          </div>

          <div className="text-center pt-30">
          © Copyright Aldo Safaris {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
