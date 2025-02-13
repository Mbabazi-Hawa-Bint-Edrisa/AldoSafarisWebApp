import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FooterOne from "@/components/layout/footers/Footer";
import Header1 from "@/components/layout/header/Header";
import PageHeader from "@/components/tourSingle/PageHeader";
import SingleOne from "@/components/tourSingle/pages/SingleOne";
import MetaComponent from "@/components/common/MetaComponent";
import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export default function TourSinglePage1() {
  const { id } = useParams(); // Get ID from URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/tours/get_tour/${id}`);
        console.log("Fetched Tour:", response.data); // Debugging
        if (!response.data) {
          setError("Tour not found.");
        } else {
          setTour(response.data); // Set fetched tour
        }
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Failed to fetch tour data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <div>Loading tour details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <MetaComponent meta={{ title: tour.title, description: tour.content }} />
      <main>
        <Header1 />
        <PageHeader />
        <SingleOne tour={tour} />
        <FooterOne />
      </main>
    </>
  );
}
