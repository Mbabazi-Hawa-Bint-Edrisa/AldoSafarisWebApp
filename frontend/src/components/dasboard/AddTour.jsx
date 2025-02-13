import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

// The tab labels
const tabs = ["Content", "Location", "Pricing", "Included"];

export default function AddTour() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  // We'll track which tab is active by index
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Form field states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  // "Included" checkboxes
  const [included, setIncluded] = useState({
    beverages: false,
    hotelPickup: false,
    insurance: false,
    softDrinks: false,
    guide: false,
    towel: false,
    tips: false,
    alcoholicBeverages: false,
  });

  // We'll store only the final (short) path from the server,
  // e.g. "/static/uploads/filename.jpg"
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [image1Preview, setImage1Preview] = useState("");
  const [image2Preview, setImage2Preview] = useState("");
  const [image3Preview, setImage3Preview] = useState("");
  const [image4Preview, setImage4Preview] = useState("");

  /**
   * Uploads the selected file to your Flask endpoint /api/upload_image,
   * which should save it to disk (e.g. static/uploads) and return 
   * { "path": "/static/uploads/<filename>" }.
   *
   * @param {File} file The file chosen by the user
   * @returns {string} The path returned by Flask, or "" if failed
   */
  const uploadFileToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // If your Flask backend is on a different IP/port, use the full URL:
      // e.g., "http://192.168.124.131:5000/api/upload_image"
      const response = await axios.post("http://127.0.0.1:5000/api/upload_image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // The server should respond with { path: "/static/uploads/filename.jpg" }
      return response.data.path;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
      return "";
    }
  };

  /**
   * Called when the user selects a file in <input type="file" />.
   * 1) We upload it (multipart) to /api/upload_image
   * 2) We store the returned path in the relevant image state
   */
  const handleImageUpload = async (event, setPreview, setServerPath) => {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file selected
  
    // Step 1: Generate a local preview using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result; // Base64 Data URL
      setPreview(dataUrl); // Update the preview state
    };
    reader.onerror = (error) => {
      console.error("Error generating preview:", error);
      alert("Failed to generate image preview.");
    };
    reader.readAsDataURL(file); // Generate the preview
  
    // Step 2: Upload the file to the server and update the server path state
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await axios.post("http://127.0.0.1:5000/api/upload_image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.path) {
        setServerPath(response.data.path); // Update the server path state
      } else {
        throw new Error("No path returned from server.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file to the server.");
    }
  };
  
  

  // Toggle a single checkbox inside "included"
  const handleCheckboxChange = (item) => {
    setIncluded((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  // Navigation: next / previous tab
  const goNextTab = () => {
    setActiveTabIndex((prev) => Math.min(prev + 1, tabs.length - 1));
  };
  const goPrevTab = () => {
    setActiveTabIndex((prev) => Math.max(prev - 1, 0));
  };

  // Check if we're on the first or last tab
  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === tabs.length - 1;

  /**
   * Called on the last tab to submit all data to /api/tours/add_tour.
   * The Flask backend just stores the data (including image paths) in the DB.
   */
  const handleSaveTour = async () => {
    try {
      // If your Flask is on a different server, use the full URL
      // e.g., "http://192.168.124.131:5000/api/tours/add_tour"
      const response = await axios.post("http://127.0.0.1:5000/api/tours/add_tour", {
        title,
        content,
        country,
        district,
        area,
        price,
        image1,
        image2,
        image3,
        image4,
        included,
      });

      console.log("Saved tour:", response.data);
      alert("Tour saved successfully!");

      // Optionally reset the form or redirect
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Failed to save tour.");
    }
  };

  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Add Tour</h1>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
              <div className="tabs -underline-2 js-tabs">
                {/* Tab buttons */}
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((tabLabel, i) => (
                    <div key={i} className="col-auto">
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          activeTabIndex === i ? "is-tab-el-active" : ""
                        }`}
                        onClick={() => setActiveTabIndex(i)}
                      >
                        {i + 1}. {tabLabel}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                      {/*===========================
                        TAB 0: CONTENT
                      ============================*/}
                      {activeTabIndex === 0 && (
                        <div className="tabs__pane is-tab-el-active">
                          <div className="contactForm row y-gap-30">
                            <div className="col-12">
                              <div className="form-input">
                                <input
                                  type="text"
                                  required
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  Tour Title
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-input">
                                <textarea
                                  required
                                  rows="8"
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  Tour Content
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <h4 className="text-18 fw-500 mb-20">Gallery</h4>
                              <div className="row x-gap-20 y-gap-20">
                                {/* IMAGE 1 */}
                                <div className="col-auto">
                                  {image1 ? (
                                    <div className="relative">
                                      {/* Preview the uploaded file from the server path */}
                                      <img
                                        src={image1Preview}
                                        alt="image1"
                                        className="size-200 rounded-12 object-cover"
                                      />
                                      <button
                                        onClick={() => setImage1("")}
                                        className="absoluteIcon1 button -dark-1"
                                      >
                                        <i className="icon-delete text-18"></i>
                                      </button>
                                    </div>
                                  ) : (
                                    <label
                                      htmlFor="imageInp1"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <img
                                        alt="upload"
                                        src={"/img/dashboard/upload.svg"}
                                      />
                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        Upload Image
                                      </div>
                                    </label>
                                  )}
                                  <input
                                    id="imageInp1"
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, setImage1Preview, setImage1)
                                    }
                                  />
                                </div>

                                {/* IMAGE 2 */}
                                <div className="col-auto">
                                  {image2 ? (
                                    <div className="relative">
                                      <img
                                        src={image2Preview}
                                        alt="image2"
                                        className="size-200 rounded-12 object-cover"
                                      />
                                      <button
                                        onClick={() => setImage2("")}
                                        className="absoluteIcon1 button -dark-1"
                                      >
                                        <i className="icon-delete text-18"></i>
                                      </button>
                                    </div>
                                  ) : (
                                    <label
                                      htmlFor="imageInp2"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <img
                                        alt="upload"
                                        src={"/img/dashboard/upload.svg"}
                                      />
                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        Upload Image
                                      </div>
                                    </label>
                                  )}
                                  <input
                                    id="imageInp2"
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, setImage2Preview, setImage2)
                                    }
                                  />
                                </div>

                                {/* IMAGE 3 */}
                                <div className="col-auto">
                                  {image3 ? (
                                    <div className="relative">
                                      <img
                                        src={image3Preview}
                                        alt="image3"
                                        className="size-200 rounded-12 object-cover"
                                      />
                                      <button
                                        onClick={() => setImage3("")}
                                        className="absoluteIcon1 button -dark-1"
                                      >
                                        <i className="icon-delete text-18"></i>
                                      </button>
                                    </div>
                                  ) : (
                                    <label
                                      htmlFor="imageInp3"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <img
                                        alt="upload"
                                        src={"/img/dashboard/upload.svg"}
                                      />
                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        Upload Image
                                      </div>
                                    </label>
                                  )}
                                  <input
                                    id="imageInp3"
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, setImage3Preview, setImage3)
                                    }
                                  />
                                </div>

                                {/* IMAGE 4 */}
                                <div className="col-auto">
                                  {image4 ? (
                                    <div className="relative">
                                      <img
                                        src={image4Preview}
                                        alt="image4"
                                        className="size-200 rounded-12 object-cover"
                                      />
                                      <button
                                        onClick={() => setImage4("")}
                                        className="absoluteIcon1 button -dark-1"
                                      >
                                        <i className="icon-delete text-18"></i>
                                      </button>
                                    </div>
                                  ) : (
                                    <label
                                      htmlFor="imageInp4"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <img
                                        alt="upload"
                                        src={"/img/dashboard/upload.svg"}
                                      />
                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        Upload Image
                                      </div>
                                    </label>
                                  )}
                                  <input
                                    id="imageInp4"
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, setImage4Preview, setImage4)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="text-14 mt-20">
                                PNG or JPG recommended, no bigger than 800px wide
                                or tall.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/*===========================
                        TAB 1: LOCATION
                      ============================*/}
                      {activeTabIndex === 1 && (
                        <div className="tabs__pane is-tab-el-active">
                          <div className="contactForm row y-gap-30">
                            <div className="col-12">
                              <div className="form-input">
                                <input
                                  type="text"
                                  required
                                  value={country}
                                  onChange={(e) => setCountry(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  Country
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-input">
                                <input
                                  type="text"
                                  required
                                  value={district}
                                  onChange={(e) => setDistrict(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  District
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-input">
                                <input
                                  type="text"
                                  required
                                  value={area}
                                  onChange={(e) => setArea(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  Area
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/*===========================
                        TAB 2: PRICING
                      ============================*/}
                      {activeTabIndex === 2 && (
                        <div className="tabs__pane is-tab-el-active">
                          <div className="contactForm row y-gap-30">
                            <div className="col-12">
                              <div className="form-input">
                                <input
                                  type="text"
                                  required
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  Tour Price
                                </label>
                              </div>
                            </div>
                          </div>


                        </div>
                      )}

                      {/*===========================
                        TAB 3: INCLUDED
                      ============================*/}
                      {activeTabIndex === 3 && (
                        <div className="tabs__pane is-tab-el-active">
                          <div className="row y-gap-20 justify-between">
                            <div className="col-md-8">
                              <div className="row y-gap-20">
                                {/* beverages */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="beverages"
                                        checked={included.beverages}
                                        onChange={() =>
                                          handleCheckboxChange("beverages")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">
                                      Beverages, drinking water, morning tea, etc.
                                    </div>
                                  </div>
                                </div>

                                {/* hotelPickup */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="hotelPickup"
                                        checked={included.hotelPickup}
                                        onChange={() =>
                                          handleCheckboxChange("hotelPickup")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">
                                      Hotel pickup &amp; drop-off
                                    </div>
                                  </div>
                                </div>

                                {/* insurance */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="insurance"
                                        checked={included.insurance}
                                        onChange={() =>
                                          handleCheckboxChange("insurance")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">Insurance</div>
                                  </div>
                                </div>

                                {/* softDrinks */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="softDrinks"
                                        checked={included.softDrinks}
                                        onChange={() =>
                                          handleCheckboxChange("softDrinks")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">Soft drinks</div>
                                  </div>
                                </div>

                                {/* guide */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="guide"
                                        checked={included.guide}
                                        onChange={() =>
                                          handleCheckboxChange("guide")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">Tour Guide</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="row y-gap-20">
                                {/* towel */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="towel"
                                        checked={included.towel}
                                        onChange={() =>
                                          handleCheckboxChange("towel")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">Towel</div>
                                  </div>
                                </div>

                                {/* tips */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="tips"
                                        checked={included.tips}
                                        onChange={() =>
                                          handleCheckboxChange("tips")
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">Tips</div>
                                  </div>
                                </div>

                                {/* alcoholicBeverages */}
                                <div className="col-12">
                                  <div className="d-flex items-center">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        name="alcoholicBeverages"
                                        checked={included.alcoholicBeverages}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            "alcoholicBeverages"
                                          )
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon">
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lh-16 ml-15">
                                      Alcoholic Beverages
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Final button to save the entire Tour */}
                          <button
                            className="button -md -dark-1 bg-accent-1 text-white mt-30"
                            onClick={handleSaveTour}
                          >
                            Save Tour
                            <i className="icon-arrow-top-right text-16 ml-10"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons to navigate between tabs */}
              <div className="d-flex justify-content-between mt-30">
                {!isFirstTab && (
                  <button
                    className="button -md -outline-dark-1 bg-light-1"
                    onClick={goPrevTab}
                  >
                    Previous
                  </button>
                )}

                {!isLastTab && (
                  <button
                    className="button -md -dark-1 bg-accent-1 text-white ml-auto"
                    onClick={goNextTab}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            <div className="text-center pt-30">
            © Copyright Aldo Safaris {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
