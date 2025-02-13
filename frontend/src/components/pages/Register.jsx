import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30">Register</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                Let's create your account!
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30">
              <div className="form-input mt-30">
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label className="lh-1 text-16 text-light-1">Your Email</label>
              </div>

              <div className="form-input mt-30">
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                Register
                <i className="icon-arrow-top-right ml-10"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
