import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";

const ContactUs = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Update form data when user data becomes available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormStatus("Submitting...");

    // Mock submission logic
    setTimeout(() => {
      setFormStatus("Thank you! Your message has been sent.");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-6">
        Have questions or need assistance? Feel free to reach out to us using
        the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-500"
            required
            aria-label="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-500"
            required
            aria-label="Enter your email address"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-500"
            required
            aria-label="Enter your message"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>

      {formStatus && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          {formStatus}
        </p>
      )}

      <section className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Other Ways to Contact Us</h2>
        <p>
          Email:{" "}
          <a href="mailto:support@example.com" className="text-green-500">
            Luminaria@co.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+1234567890" className="text-green-500">
            +233 597090312
          </a>
        </p>
        <p>Address: University of Ghana Legon</p>
      </section>
    </div>
  );
};

export default ContactUs;
