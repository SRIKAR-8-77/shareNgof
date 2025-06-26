import React, { useState } from "react";
import axios from "axios";
import carGif from '../assets/images/car-rent.gif';
import { useAuth } from "../context/AuthContext";

// Logo imports...
import avisLogo from '../assets/images/logos/avis.png';
import hertzLogo from '../assets/images/logos/hertz.png';
import enterpriseLogo from '../assets/images/logos/enterprise.png';
import alamoLogo from '../assets/images/logos/alamo.png';
import budgetLogo from '../assets/images/logos/budget.png';
import sixtLogo from '../assets/images/logos/sixt.png';
import nationalLogo from '../assets/images/logos/national.png';
import thriftyLogo from '../assets/images/logos/thrifty.png';
import dollarLogo from '../assets/images/logos/dollar.png';
import foxLogo from '../assets/images/logos/fox.png';
import europcarLogo from '../assets/images/logos/europcar.png';

const RentCarPage = () =>{
  const { currentUser } = useAuth();
  const [sameLocation, setSameLocation] = useState(true);
  const [vehicleType, setVehicleType] = useState("Sedan");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [chargePerHour, setChargePerHour] = useState("");
  const [extraInstructions, setExtraInstructions] = useState("");

  const vehicleOptions = ["Sedan", "SUV", "Hatchback", "Van", "Luxury", "Bike"];

  const partnerLogos = [
    { src: avisLogo, alt: "Avis" },
    { src: hertzLogo, alt: "Hertz" },
    { src: enterpriseLogo, alt: "Enterprise" },
    { src: alamoLogo, alt: "Alamo" },
    { src: budgetLogo, alt: "Budget" },
    { src: sixtLogo, alt: "Sixt" },
    { src: nationalLogo, alt: "National" },
    { src: thriftyLogo, alt: "Thrifty" },
    { src: dollarLogo, alt: "Dollar" },
    { src: foxLogo, alt: "Fox" },
    { src: europcarLogo, alt: "Europcar" },
  ];

  const handleSubmit = async () => {
    if (!currentUser || !currentUser.email) {
      alert("You must be logged in to set a vehicle for rent.");
      return;
    }

    if (!pickup || !pickupDate || !pickupTime || !returnDate || !returnTime || !chargePerHour) {
      alert("Please fill all required fields.");
      return;
    }

    if (!sameLocation && !dropoff) {
      alert("Please enter a drop-off location.");
      return;
    }

    if (chargePerHour <= 0) {
      alert("Charge per hour must be greater than 0.");
      return;
    }

    const bookingDetails = {
      pickup,
      dropoff: sameLocation ? pickup : dropoff,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      vehicleType,
      chargePerHour,
      extraInstructions,
      userEmail: currentUser.email
    };

    try {
      const response = await axios.post("http://localhost:8080/api/rentals", bookingDetails);
      alert("Booking submitted successfully!");
      console.log("Server response:", response.data);

      // Reset form
      setPickup("");
      setDropoff("");
      setPickupDate("");
      setPickupTime("");
      setReturnDate("");
      setReturnTime("");
      setChargePerHour("");
      setExtraInstructions("");
      setSameLocation(true);
      setVehicleType("Sedan");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again later.");
    }
  };

  return (
    <div className="bg-orange-600 p-6 space-y-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2 bg-white border border-orange-700 shadow-lg rounded-xl p-6 space-y-6 text-black">
          <h2 className="text-2xl font-bold text-orange-700">Find the Best Rental Deals</h2>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={() => setSameLocation(!sameLocation)}
              className="accent-orange-600"
            />
            <label className="text-sm text-gray-700">
              Drop-off location is the same
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border border-orange-400 p-3 rounded-md focus:ring-orange-600 focus:border-orange-600"
              type="text"
              placeholder="Enter Pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            {!sameLocation && (
              <input
                className="border border-orange-400 p-3 rounded-md focus:ring-orange-600 focus:border-orange-600"
                type="text"
                placeholder="Enter Drop-off location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              className="border p-3 rounded-md border-orange-400"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
            <input
              className="border p-3 rounded-md border-orange-400"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
            <input
              className="border p-3 rounded-md border-orange-400"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
            <input
              className="border p-3 rounded-md border-orange-400"
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {vehicleOptions.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${
                  vehicleType === type
                    ? "bg-orange-600 text-white border-orange-700"
                    : "bg-white border-gray-300 text-black hover:bg-orange-100"
                }`}
                onClick={() => setVehicleType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Charge Per Hour (₹)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={chargePerHour}
              onChange={(e) => setChargePerHour(e.target.value)}
              className="border border-orange-400 p-3 rounded-md w-full focus:ring-orange-600 focus:border-orange-600"
              placeholder="Enter charge per hour"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Extra Instructions
            </label>
            <textarea
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
              rows={3}
              placeholder="Any additional instructions or requests"
              className="border border-orange-400 p-3 rounded-md w-full focus:ring-orange-600 focus:border-orange-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!currentUser || !currentUser.email}
            className={`${
              (!currentUser || !currentUser.email)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-700 hover:bg-orange-800"
            } text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto`}
          >
            Set Your Vehicle For Rent
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={carGif}
            alt="Car Animation"
            className="max-w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-xl font-bold text-center text-white mb-6">
          Trusted Rental Partners
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {partnerLogos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-24 w-32 object-contain mx-auto hover:scale-110 hover:shadow-2xl transition duration-300 ease-in-out"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentCarPage;
