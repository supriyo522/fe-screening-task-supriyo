// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import "./styles.css";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route element={<AboutUs />} />
    <Route element={<ContactUs />} />
  </Routes>
);

export default App;
