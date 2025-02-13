import React, { useState } from "react";
import ImageLightBox from "./ImageLightBox";

const baseURL = "http://127.0.0.1:5000"; // Flask server base URL

export default function Gallery1({ tour }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const images = [
    { id: 1, image: tour?.image1 ? `${baseURL}${tour.image1}` : null },
    { id: 2, image: tour?.image2 ? `${baseURL}${tour.image2}` : null },
    { id: 3, image: tour?.image3 ? `${baseURL}${tour.image3}` : null },
    { id: 4, image: tour?.image4 ? `${baseURL}${tour.image4}` : null },
  ].filter((img) => img.image); // Filter out undefined or null images

  if (images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {images.map((img, index) => (
            <img key={index} src={img.image} alt={`Gallery Image ${index + 1}`} />
          ))}
        </div>

        <div className="tourSingleGrid__button">
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
            <span
              onClick={() => setActiveLightBox(true)}
              className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
            >
              See all photos
            </span>
          </div>
        </div>
      </div>
      <ImageLightBox
        images={images}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
