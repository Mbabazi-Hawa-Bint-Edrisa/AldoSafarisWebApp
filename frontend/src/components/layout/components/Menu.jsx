import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Menu() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  // Dynamic role-based menu item
  const dynamicMenuItem = user?.role === "admin"
    ? { label: "Dashboard", href: "/db-booking" }
    : { label: "Bookings", href: "/db-booking-user" };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Contact", href: "/contact" },
    dynamicMenuItem, // Add dynamic menu item
  ];

  return (
    <div className="xl:d-none ml-30">
      <div className="desktopNav">
        {menuItems.map((item, i) => (
          <div className="desktopNav__item" key={i}>
            {item.label === "Bookings" || item.label === "Dashboard" ? (
              <button
                onClick={() => handleProtectedNavigation(item.href)}
                className="button-link"
              >
                {item.label}
              </button>
            ) : (
              <Link to={item.href}>{item.label}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
