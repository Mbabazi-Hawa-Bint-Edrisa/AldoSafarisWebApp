import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Calender from "../common/dropdownSearch/Calender";

export default function TourSingleSidebar({ tour }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const baseURL = "http://127.0.0.1:5000";

  const [price, setPrice] = useState(0);
  const [adultNumber, setAdultNumber] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (tour) {
      setPrice(tour.price);
    }
    console.log("AuthContext:", { isLoggedIn, user });
  }, [tour, isLoggedIn, user]);

  const handleBookingClick = async () => {
    if (!isLoggedIn) {
      return navigate("/login", { state: { from: window.location.pathname } });
    }
  
    if (!user?.id) {
      alert("User details are missing. Please log in again.");
      return;
    }
  
    if (!selectedDate) {
      alert("Please select a date for the booking.");
      return;
    }
  
    const bookingDetails = {
      user_id: user.id,
      tour_id: tour.id,
      date: selectedDate,
      total_cost: price * adultNumber,
      number_of_people: adultNumber, // Add this field
    };
  
    console.log("Booking Details:", bookingDetails);
  
    try {
      const response = await fetch(
        `${baseURL}/api/bookings/create_booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Booking failed:", data.error);
        alert(`Failed to book: ${data.error}`);
        return;
      }
  
      alert("Booking successful!");
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="tourSingleSidebar">
      <div className="d-flex items-center">
        <div>From</div>
        <div className="text-20 fw-500 ml-10">${price.toFixed(2)}</div>
      </div>

      <div className="searchForm -type-1 -sidebar mt-20">
        <div className="searchForm__form">
          <div className="searchFormItem js-select-control js-form-dd js-calendar">
            <div className="searchFormItem__button" data-x-click="calendar">
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-calendar"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>Select Date</h5>
                <Calender onChange={(date) => setSelectedDate(date)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>

      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Number of people{" "}
            <span className="fw-500">${(price * adultNumber).toFixed(2)}</span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setAdultNumber((prev) => (prev > 1 ? prev - 1 : prev))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{adultNumber}</div>
            </div>

            <button
              onClick={() => setAdultNumber((prev) => prev + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="line mt-20 mb-20"></div>

      <div className="d-flex items-center justify-between">
        <div className="text-18 fw-500">Total:</div>
        <div className="text-18 fw-500">
          ${(price * adultNumber).toFixed(2)}
        </div>
      </div>

      <button
        onClick={handleBookingClick}
        className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20"
      >
        Book Now
        <i className="icon-arrow-top-right ml-10"></i>
      </button>
    </div>
  );
}
