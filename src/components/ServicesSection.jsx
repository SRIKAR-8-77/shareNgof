import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMiscellaneousServices } from "react-icons/md"; // 🛠 import the icon
import ElectricCabImage from "../assets/images/Electric-cab.jpeg";
import Rentcar from "../assets/images/rentcar.jpeg";
import sharenow from "../assets/images/sharenow.png";
import travelpoll from "../assets/images/travelpoll.png";
import exploremore from "../assets/images/exploremore.jpeg"; // Correct import

const services = [
  { title: "BOOK NOW", image: ElectricCabImage, path: "/book-cab" },
  { title: "RENT NOW", image: Rentcar, path: "/rent-car" },
  { title: "SHARE NOW", image: sharenow, path: "/share-now" },
  { title: "ADD A TRAVEL POLL", image: travelpoll, path: "/travel-polls" },
  { title: "EXPLORE MORE", image: exploremore },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-400 min-h-screen p-8 flex flex-col items-center">
      {/* Heading with Icon */}
      <div className="flex items-center space-x-4 mb-8">
        <MdMiscellaneousServices className="text-white text-5xl" />
        <h2 className="text-4xl font-extrabold text-white">OUR SERVICES</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg h-64 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition duration-300"
            />

            <button
              onClick={() => service.path && navigate(service.path)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition-all duration-300"
            >
              {service.title}
            </button>
          </div>
        ))}
      </div>

      {/* Premium Section */}
      <div className="mt-12 w-full max-w-4xl bg-white p-6 flex flex-col md:flex-row justify-between items-center rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 md:mb-0 text-center">
          TRY OUR PREMIUM FOR MORE ACCESSIBILITY
        </h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full transition-all duration-300">
          TRY NOW
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
