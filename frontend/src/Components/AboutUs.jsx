import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 flex flex-col">
      <div className="max-w-5xl mx-auto text-center flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to our store! We are passionate about providing high-quality electronics and gadgets that make your life easier and more enjoyable.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Our mission is to deliver the best products at competitive prices while ensuring a smooth and secure shopping experience. Customer satisfaction is our top priority!
        </p>
        <p className="text-gray-600 text-lg mb-12">
          Founded in 2023, we have grown into a community of tech enthusiasts who trust us for quality, reliability, and exceptional service.
        </p>

    
        
      </div>

      {/* Footer / Made by */}
      <footer className="mt-12 text-center text-gray-500">
        Made by <span className="font-semibold text-gray-700">Ravi Shamra</span>
      </footer>
    </div>
  );
};

export default AboutUs;
