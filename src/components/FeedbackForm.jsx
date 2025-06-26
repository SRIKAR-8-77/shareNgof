import React, { useState } from "react";
import {
  MdStar,
  MdStarBorder,
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdHome,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const FeedbackForm = () => {
  const { currentUser } = useAuth();
  const [occupation, setOccupation] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.email) {
      alert("Please login to give feedback");
      return;
    }

    if (!message.trim() || rating === 0 || !occupation.trim()) {
      alert("Please enter your feedback message, rating, and occupation.");
      return;
    }

    setLoading(true);

    try {
      const feedbackData = {
        name: currentUser.name || currentUser.email,
        email: currentUser.email,
        occupation,
        message,
        rating,
      };

      const response = await fetch("https://sharengob.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (response.status === 409) {
        alert("You have already given feedback.");
      } else if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      alert("Error submitting feedback.");
      console.error("Feedback submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-6">
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-md text-center text-yellow-400 text-3xl font-extrabold">
          Thank you for your feedback!
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-6">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-6xl flex flex-col lg:flex-row justify-between">
        {/* LEFT: FORM SECTION */}
        <div className="w-full lg:w-2/3 pr-0 lg:pr-10">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">
            Get in touch
          </h2>
          <p className="text-gray-300 text-sm font-semibold mb-6">
            We value your feedback! Let us know your thoughts.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none border border-gray-600"
            />

            <textarea
              placeholder="Go ahead, we are listening..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 h-24 focus:outline-none border border-gray-600"
            />

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Overall Rating
              </label>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleStarClick(index)}
                    disabled={loading}
                  >
                    {index < rating ? (
                      <MdStar className="text-yellow-400 text-3xl" />
                    ) : (
                      <MdStarBorder className="text-yellow-400 text-3xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:bg-yellow-500 transition-all"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT: CONTACT INFO SECTION */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 flex flex-col justify-center space-y-6 text-gray-200 text-lg font-semibold">
          <div className="flex items-center space-x-4">
            <MdEmail className="text-3xl text-yellow-400" />
            <span>Email</span>
          </div>
          <div className="flex items-center space-x-4">
            <MdLocationOn className="text-3xl text-yellow-400" />
            <span>Location</span>
          </div>
          <div className="flex items-center space-x-4">
            <MdPhone className="text-3xl text-yellow-400" />
            <span>Contact</span>
          </div>
          <div className="flex items-center space-x-4">
            <MdHome className="text-3xl text-yellow-400" />
            <span>Address</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
