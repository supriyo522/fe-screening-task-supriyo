// LandingPage.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";

const LandingPage = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [doctors, setDoctors] = useState([]);
  const [cities, setCities] = useState([]);
  const defaultCity = "New York"; // Default city for demonstration
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real-world scenario, replace the URL with your API endpoint
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        const doctorData = response.data;
        setDoctors(doctorData);
        // Extract unique cities from doctors
        const uniqueCities = [
          ...new Set(doctorData.map((doctor) => doctor.address.city)),
        ];
        setCities(uniqueCities);

        // Check if there's a 'city' parameter in the URL
        const urlCityParam = new URLSearchParams(window.location.search).get(
          "city"
        );
        if (urlCityParam && uniqueCities.includes(urlCityParam)) {
          setValue("selectedCity", urlCityParam);
        } else {
          setValue("selectedCity", defaultCity);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, [defaultCity, setValue]);

  const handleCityChange = (selectedCity) => {
    navigate(`?city=${selectedCity}`);
  };
  const testimonialsData = [
    {
      text: "Great experience with Fix Health! Highly recommended.",
      author: "John Doe",
    },
    { text: "The doctors are knowledgeable and caring.", author: "Jane Smith" },
    { text: "The doctors are knowledgeable ", author: "Jane" },
    // Add more testimonials as needed
  ];

  return (
    <div className="landing-page">
      <Navbar />
      <section className="hero-section">
        {/* Your attractive hero image goes here */}
        <h1>Welcome to Fix Health</h1>
        <p>Your Health, Our Priority. Providing Quality Healthcare Services.</p>
      </section>
      <AboutUs />
      <section className="booking-form-section">
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          Consultation booking form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label">Name: </label>
          <input className="form-input" {...register("name")} />
          <br />
          <label className="form-label">Phone Number:</label>
          <input className="form-input" {...register("phone")} />
          <br />
          <label className="form-label">Age:</label>
          <input className="form-input" {...register("age")} />
          <br />
          <label className="form-label">Select City:</label>
          <select
            className="form-select"
            {...register("selectedCity", { value: defaultCity })}
            onChange={(e) => {
              setValue("selectedCity", e.target.value);
              handleCityChange(e.target.value);
            }}
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <br />
          <label className="form-label">Company:</label>
          <input className="form-input" {...register("company")} />
          <br />
          <label className="form-label">Chief Complaints:</label>
          <input className="form-input" {...register("chiefComplaints")} />
          <br />
          {watch("age") && parseInt(watch("age")) < 40 && (
            <>
              <label className="form-label">
                Any previous experience with physiotherapy:
              </label>
              <input
                className="form-input"
                {...register("previousExperience")}
              />
            </>
          )}
          <br />
          <label className="form-label">Filter Doctors for Your City:</label>
          <select className="form-select" {...register("selectedCity")}>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.address.city}>
                {doctor.name} - {doctor.address.city}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" className="submit-btn">
            Book Consultation
          </button>
        </form>
      </section>

      <Testimonials testimonials={testimonialsData} />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
