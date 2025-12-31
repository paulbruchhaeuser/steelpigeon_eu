import React, { useState } from "react";
import "./Contact.css";

export default function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSubmitted(false);
        }, 2000);
      } else {
        console.error("Failed to submit form");
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert("Error sending message. Make sure the server is running.");
    }
  };

  return (
    <div className="contact">
      <div className="contact__header">
        <h1>Contact</h1>
        <button className="contact__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className="contact__content">
        {submitted ? (
          <div className="contact__success">
            <p>Thank you! Your message has been sent.</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form__group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="contact__submit">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
