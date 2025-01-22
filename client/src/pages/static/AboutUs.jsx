import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-beige min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us</h3>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to <strong>Luminaria</strong>, where we craft warmth, light, and memories.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Founded with a passion for creating cozy spaces and meaningful moments, our candles are thoughtfully designed to bring joy to your everyday life. Each one is handmade using high-quality, eco-friendly materials, ensuring a clean and long-lasting burn.
        </p>
        <div className="flex justify-center my-6">
          <img
            src="images/candle 1.jpg"
            alt="Candle 1"
            className="h-48 w-56 object-cover rounded-md shadow-lg"
          />
        </div>
        <p className="text-gray-700 text-lg mb-4">
          At <strong>Luminaria</strong>, we believe in sustainability and mindfulness. That’s why our candles are made with love, using natural wax, lead-free wicks, and fragrances that soothe the soul.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Whether you’re looking to unwind after a long day or brighten a special occasion, our candles are here to elevate your experience.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for supporting our small business. Together, we’re lighting the world, one candle at a time.
        </p>
        <p className="text-gray-800 font-semibold text-lg italic text-center">
          <strong>Luminaria</strong> <br />
          Crafting light, creating memories.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
          <img
            src="images/candle 2.jpg"
            alt="Candle 2"
            className="h-48 w-56 object-cover rounded-md shadow-lg"
          />
          <img
            src="images/candle 3.jpg"
            alt="Candle 3"
            className="h-48 w-56 object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
