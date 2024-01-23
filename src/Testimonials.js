// Testimonials.js
import React from "react";
import ReactCaroussel from "react-caroussel";
import "react-caroussel/dist/index.css";

const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-heading">Testimonials</h2>
      <ReactCaroussel
        infinite={true}
        autoplay={true}
        speed={2} // 2s
        display={{
          dots: true,
          arrows: false,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <p className="testimonial-text">{testimonial.text}</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </ReactCaroussel>
    </section>
  );
};

export default Testimonials;
