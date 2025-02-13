import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/style.css";
import Aos from "aos";
// import HomePage1 from "./pages/homes/home-1";
import { useEffect } from "react";
import HomePage from "./pages/home";
import ScrollTopBehaviour from "./components/common/ScrollTopBehavier";
import ScrollToTop from "./components/common/ScrollToTop";
import TourListPage from "./pages/tour-lists";
import TourSinglePage from "./pages/tour-singles";
import DBBookingPage from "./pages/dashboard/db-booking";
import DBBookingUserPage from "./components/dasboard/DbUserBooking";
import DBListingPage from "./pages/dashboard/db-listing";
import DBAddTourPage from "./pages/dashboard/db-add-tour";
import DestinationsPage from "./pages/pages/destinations";
import AboutPage from "./pages/pages/about";
import LoginPage from "./pages/pages/login";
import RegisterPage from "./pages/pages/register";
import NotFoundPage from "./pages/pages/404";
import ContactPage from "./pages/pages/contact";
import { AuthProvider } from "@/context/AuthContext";
function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="/tour-list" element={<TourListPage />} />
              <Route path="/tour-single/:id" element={<TourSinglePage />} />
              <Route path="/db-booking" element={<DBBookingPage />} />
              <Route path="/db-booking-user" element={<DBBookingUserPage />} />
              <Route path="/db-user-booking" element={<DBBookingUserPage />} />
              <Route path="/db-listing" element={<DBListingPage />} />
              <Route path="/db-add-tour" element={<DBAddTourPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>
      </AuthProvider>
      <ScrollToTop />
    </>
  );
}

export default App;
