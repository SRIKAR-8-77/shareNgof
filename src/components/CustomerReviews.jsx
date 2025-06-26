import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Rahul",
    role: "Student",
    message:
      "Using the rickshaw services on campus has made my commute so much easier and affordable. The drivers are friendly and reliable.",
    bgColor: "bg-white text-black",
  },
  {
    name: "Joseph",
    role: "Faculty Member",
    message:
      "I appreciate the cab sharing option as it allows me to save money on my daily commute to campus. It's a great initiative!",
    bgColor: "bg-[#FFD700] text-black",
  },
  {
    name: "Anwar",
    role: "Software Engineer",
    message:
      "The transportation service on campus has been very helpful during my time here. I always found the service reliable and safe.",
    bgColor: "bg-white text-black",
  },
  {
    name: "Saatvic",
    role: "Staff Member",
    message:
      "The transport service is convenient and well-managed. It makes my daily commute to work stress-free.",
    bgColor: "bg-[#FFD700] text-black",
  },
  {
    name: "Sneha",
    role: "Research Scholar",
    message:
      "I love how quick and easy it is to book a cab on campus now. The app interface is user-friendly and the services are prompt.",
    bgColor: "bg-white text-black",
  },
  {
    name: "Rajesh",
    role: "Maintenance Staff",
    message:
      "Having access to reliable transport has made a big difference in my daily routine. The vehicles are well-maintained and safe.",
    bgColor: "bg-[#FFD700] text-black",
  },
];

const CustomerReviews = () => {
  return (
    <div className="min-h-screen px-4 py-10 bg-black text-center text-white">
      <h1 className="text-4xl font-extrabold mb-4">CUSTOMER REVIEWS</h1>
      <p className="text-lg mb-10">
        Hear what our users have to say about their experience with our transport services.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
        {testimonials.map((review, index) => (
          <div
            key={index}
            className={`${review.bgColor} shadow-lg rounded-lg p-6 w-full max-w-md text-center hover:scale-105 transition-transform duration-300`}
          >
            <FaUserCircle className="text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-bold">{review.name}</h3>
            <p className="text-sm font-semibold mb-2">{review.role}</p>
            <p className="text-sm leading-relaxed">{review.message}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/feedback">
          <button className="bg-[#FFD700] text-black px-6 py-2 rounded-md hover:bg-yellow-400 font-semibold">
            Give Feedback
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerReviews;
