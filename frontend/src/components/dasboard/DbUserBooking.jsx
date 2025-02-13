import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./SidebarUser";
import Header from "./Header";
import Pagination from "../common/Pagination";
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const tabs = ["Approved", "Pending", "Cancelled"];

export default function DbUserBooking() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("Approved");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isLoggedIn } = useContext(AuthContext); // Access user context

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      console.error("User not logged in or user ID missing");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/bookings/get_bookings_by_user/${user.id}`, // Fetch bookings by user ID
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoggedIn, user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/bookings/update_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId, status: "Cancelled" }),
      });

      if (response.ok) {
        alert("Booking cancelled successfully!");
        // Refresh bookings to reflect updated status
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
        );
        setBookings(updatedBookings);
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel booking: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) {
    console.log("AuthContext user:", { user });

    return <div>Loading bookings...</div>;
  }

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
          <h1 className="text-30">My Bookings</h1>
          <p className="text-16">View and manage your booking history below.</p>

          <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:mb-20 mt-60">
            <div className="tabs -underline-2 js-tabs">
              <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                {tabs.map((tab, i) => (
                  <div
                    key={i}
                    className="col-auto"
                    onClick={() => setcurrentTab(tab)}
                  >
                    <button
                      className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                        tab === currentTab ? "is-tab-el-active" : ""
                      }`}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>

              <div className="tabs__content js-tabs-content">
                <div className="tabs__pane -tab-item-1 is-tab-el-active">
                  <div className="overflowAuto">
                    <table className="tableTest mb-30">
                      <thead className="bg-light-1 rounded-12">
                        <tr>
                          <th>ID</th>
                          <th>Tour Name</th>
                          <th>Date</th>
                          <th>Number of People</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookings
                          .filter((booking) => booking.status === currentTab)
                          .map((booking, i) => (
                            <tr key={i}>
                              <td>{booking.id}</td>
                              <td>{booking.tour_title}</td>
                              <td>{booking.date}</td>
                              <td>{booking.number_of_people}</td>
                              <td>${booking.total_cost.toFixed(2)}</td>
                              <td>
                                <div
                                  className={`circle ${
                                    booking.status === "Approved"
                                      ? "text-purple-1"
                                      : booking.status === "Pending"
                                      ? "text-yellow-1"
                                      : "text-red-2"
                                  } `}
                                >
                                  {booking.status}
                                </div>
                              </td>
                              <td>
                                {booking.status === "Pending" && (
                                  <button
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="button -dark-1 size-35 bg-light-1 rounded-full flex-center"
                                    title="Cancel Booking"
                                  >
                                    <i className="icon-cross text-14 text-red-2"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <Pagination />

                  <div className="text-14 text-center mt-20">
                    Showing results 1-30 of {bookings.length}
                  </div>
                </div>
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
