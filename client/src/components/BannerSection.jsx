import React from 'react';

const BannerSection = ({ image, title, description }) => {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${image})`, height: '400px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 text-center">
        <div className="text-white max-w-md">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
