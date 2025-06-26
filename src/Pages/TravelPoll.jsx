import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";



const TravelPollsPage = () => {
  const { currentUser } = useAuth();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/travel-polls", {
        withCredentials: true,
      });
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls:", err);
    }
  };

  const handleCreatePoll = async () => {
    if (destination && date && description && currentUser) {
      const newPoll = {
        destination,
        date,
        description,
        votes: 0,
        userEmail: currentUser.email || "test@example.com"
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/travel-polls",
          newPoll,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const savedPoll = response.data;
        setPolls([savedPoll, ...polls]);
        setDestination("");
        setDate("");
        setDescription("");
      } catch (error) {
        console.error("Error creating poll:", error);
        alert("Failed to create poll");
      }
    }
  };

  const handleVote = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/travel-polls/${id}/vote`,
        {},
        {
          withCredentials: true,
        }
      );

      fetchPolls(); // refresh the poll list
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Travel Poll</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="border p-3 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the trip (who, what, why, etc.)"
          className="border p-3 rounded-md w-full focus:ring-yellow-600 focus:border-yellow-600"
        />

        <button
          onClick={handleCreatePoll}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto"
        >
          Create Poll
        </button>
      </div>

      {/* Existing Polls Section */}
      <div className="max-w-4xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">Active Travel Polls</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {poll.destination}
                </h4>
                <p className="text-sm text-gray-600">Date: {poll.date}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {poll.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {poll.votes} people interested
                  </span>
                  <button
                    onClick={() => handleVote(poll.id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm"
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPollsPage;
