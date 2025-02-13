import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext); // Access login function

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error);
        return;
      }
  
      console.log("Successful login, user data:", data.user); // Debugging
  
      // Pass the user data to the AuthContext login function
      login(data.user);
  
      navigate("/"); // Redirect to home or previous page
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30">Log In</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                We're glad to see you again!
              </div>
              <div className="mt-5">
                Don't have an account?{" "}
                <Link to="/register" className="text-accent-1">
                  Sign Up!
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleLogin}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
              {error && <div className="text-danger mb-3">{error}</div>}

              <div className="form-input ">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  Email Address
                </label>
              </div>

              <div className="form-input mt-30">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <button
                type="submit"
                className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30"
              >
                Log In
                <i className="icon-arrow-top-right ml-10"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
