import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are a modern ecommerce platform dedicated to providing the best
            products and services to our customers. Your satisfaction is our
            priority.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-gray-400 hover:text-white transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-and-conditions"
                className="text-gray-400 hover:text-white transition"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="text-gray-400 mb-4">
            Have questions? Reach out to us anytime.
          </p>
          <div className="flex space-x-4 mb-4">
            <a
              href="mailto:info@company.com"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition text-xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShopLogo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
