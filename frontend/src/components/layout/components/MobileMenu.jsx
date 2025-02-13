import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const socialMediaLinks = [
  { id: 1, class: "icon-facebook", href: "#" },
  { id: 2, class: "icon-twitter", href: "#" },
  { id: 3, class: "icon-instagram", href: "#" },
  { id: 4, class: "icon-linkedin", href: "#" },
];

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }) {
  const [activeSub, setActiveSub] = useState("");
  const { pathname } = useLocation();
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
    <div
      data-aos="fade"
      className={`menu js-menu ${mobileMenuOpen ? "-is-active" : ""}`}
      style={
        mobileMenuOpen
          ? { opacity: "1", visibility: "visible" }
          : { pointerEvents: "none", visibility: "hidden" }
      }
    >
      <div
        onClick={() => setMobileMenuOpen(false)}
        className="menu__overlay js-menu-button"
      ></div>

      <div className="menu__container">
        <div className="menu__header">
          <h4>Main Menu</h4>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="js-menu-button"
          >
            <i className="icon-cross text-10"></i>
          </button>
        </div>

        <div className="menu__content">
          <ul
            className="menuNav js-navList -is-active"
            style={{ maxHeight: "calc(100vh - 262px)", overflowY: "auto" }}
          >
            {menuItems.map((item, i) => (
              <li key={i} className="menuNav__item">
                {item.label === "Bookings" || item.label === "Dashboard" ? (
                  <button
                    onClick={() => handleProtectedNavigation(item.href)}
                    className="button-link"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={pathname === item.href ? "activeMenu" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="menu__footer">
          <i className="icon-headphone text-50"></i>
          <div className="d-flex items-center x-gap-10 pt-30">
            {socialMediaLinks.map((elm, i) => (
              <div key={i}>
                <a href={elm.href} className="d-block">
                  <i className={elm.class}></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
