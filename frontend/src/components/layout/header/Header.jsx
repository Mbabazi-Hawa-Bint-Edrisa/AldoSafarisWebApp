import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx"; // Authentication Context
import MobileMenu from "../components/MobileMenu";
import Menu from "../components/Menu";

export default function Header9() {
  const { isLoggedIn, user, logout } = useContext(AuthContext); // Access authentication state and user info
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header
        className={`header -type-10 js-header  ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container">
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu .text-black"></i>
            </button>
          </div>

          <div className="header__left">
            <div className="header__logo">
              <Link to="/" className="header__logo">
                <img
                  src="/img/logo/edited_logo.png"
                  alt="logo icon"
                  style={{ width: "100px", height: "auto" }}
                />
              </Link>
              <div className=".text-black">
                <Menu />
              </div>
            </div>
          </div>

          <div className="headerMobile__right">
            <button
              onClick={() => navigate("/tour-list-1")}
              className="d-flex"
            >
              <i className="icon-search text-18 text-white"></i>
            </button>

            {isLoggedIn ? (
              <button className="d-flex ml-20">
                <img
                  src="/img/avatars/profile-icon.png" // Replace with user's profile picture URL if available
                  alt="Profile"
                  className="size-30 rounded-full"
                />
                <span className="ml-10">{user?.name}</span>
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="d-flex ml-20">
                <i className="icon-person text-18 text-white"></i>
              </button>
            )}
          </div>

          <div className="header__right">
            {isLoggedIn ? (
              <>
                <span className="text-black ml-10">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="button -sm -outline-black text-black rounded-200 ml-30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="text-black ml-10">
                  Sign up
                </Link>

                <Link
                  to="/login"
                  className="button -sm -outline-black text-black rounded-200 ml-30"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </>
  );
}
