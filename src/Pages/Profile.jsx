import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import userRemoteImage from "../assets/images/userremote.jpeg";

const Profile = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [rides, setRides] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [polls, setPolls] = useState([]);
  const [activeTab, setActiveTab] = useState("rides");

  useEffect(() => {
    if (!currentUser?.email) return;

    axios.get(`https://sharengob.onrender.com/api/profile/${currentUser.email}`)
      .then(res => {
        setBio(res.data.bio);
        setProfileImageUrl(res.data.imageUrl);
      })
      .catch(err => console.error(err));

    axios.get(`https://sharengob.onrender.com/api/rides/user/${currentUser.email}`)
      .then(res => setRides(res.data))
      .catch(err => console.error(err));

    axios.get(`https://sharengob.onrender.com/api/rentals/user/${currentUser.email}`)
      .then(response => {
      console.log(response.data);  // ✅ Confirm you see your rental data
      setRentals(response.data);
    })
    .catch(err => console.error(err));

    axios.get(`https://sharengob.onrender.com/api/travel-polls/user/${currentUser.email}`)
      .then(res => setPolls(res.data))
      .catch(err => console.error(err));
  }, [currentUser.email]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axios.post(`https://sharengob.onrender.com/api/profile/image/${currentUser.email}`, formData)
      .then(() => {
        setProfileImageUrl(URL.createObjectURL(file));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 mt-6">
      <div className="relative bg-gray-100 h-48">
        <img
          src={userRemoteImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-14 left-6">
          <div className="relative w-28 h-28">
            <img
              src={profileImageUrl || userRemoteImage}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
              onError={(e) => { e.target.src = userRemoteImage; }}
            />
            <label className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded-full cursor-pointer shadow">
              <input type="file" className="hidden" onChange={handleImageUpload} />
              ✎
            </label>
          </div>
        </div>
      </div>

      <div className="pt-20 px-6 pb-6">
        <h2 className="text-2xl font-bold">{currentUser.name || "User Name"}</h2>
        <p className="text-sm text-gray-500 mt-1">{currentUser.email}</p>
        <p className="mt-2 text-gray-700">{bio}</p>

        <div className="mt-4 flex flex-wrap gap-4 border-b pb-2">
          {["Rides", "Rentals", "Travel Polls"].map(tab => (
            <button
              key={tab}
              className={`text-sm font-medium ${activeTab === tab.toLowerCase().replace(" ", "") ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-600"} hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition`}
              onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "rides" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {rides.length > 0 ? rides.map(ride => (
      <div key={ride.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
        <h3 className="font-semibold text-gray-700">Pickup: {ride.pickup}</h3>
        <p className="text-sm text-gray-500">Dropoff: {ride.drop}</p>
        <p className="text-sm text-gray-500">Date: {ride.date}</p>
        <p className="text-sm text-gray-500">Time: {ride.time}</p>
        <p className="text-sm text-gray-500">Vehicle Type: {ride.vehicleType}</p>
        <p className="text-sm text-gray-500">Seats Left: {ride.seatsLeft}</p>
        <p className="text-sm text-gray-500">Shared By: {ride.userEmail}</p>
      </div>
    )) : <p className="text-gray-400">No rides found.</p>}
  </div>
)}


          {activeTab === "rentals" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {rentals.length > 0 ? rentals.map(rental => (
      <div key={rental.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
        <h3 className="font-semibold text-gray-700">Pickup: {rental.pickup}</h3>
        <p className="text-sm text-gray-500">Dropoff: {rental.dropoff}</p>
        <p className="text-sm text-gray-500">Pickup Date: {rental.pickupDate}</p>
        <p className="text-sm text-gray-500">Pickup Time: {rental.pickupTime}</p>
        <p className="text-sm text-gray-500">Return Date: {rental.returnDate}</p>
        <p className="text-sm text-gray-500">Return Time: {rental.returnTime}</p>
        <p className="text-sm text-gray-500">Charge Per Hour: ₹{rental.chargePerHour}</p>
        <p className="text-sm text-gray-500">Add Hotel: {rental.addHotel ? "Yes" : "No"}</p>
        <p className="text-sm text-gray-500">Instructions: {rental.extraInstructions || "N/A"}</p>
      </div>
    )) : <p className="text-gray-400">No rentals found.</p>}
  </div>
)}


          {activeTab === "travelpolls" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {polls.length > 0 ? polls.map(poll => (
      <div key={poll.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
        <h3 className="font-semibold text-gray-700">Destination: {poll.destination}</h3>
        <p className="text-sm text-gray-500">Date: {poll.date}</p>
        <p className="text-sm text-gray-500">Description: {poll.description}</p>
        <p className="text-sm text-gray-500">Votes: {poll.votes}</p>
        <p className="text-sm text-gray-500">Created By: {poll.userEmail}</p>
      </div>
    )) : <p className="text-gray-400">No travel polls found.</p>}
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
