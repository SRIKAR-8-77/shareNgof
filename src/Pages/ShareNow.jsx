import { useEffect,useState } from "react";
import { useAuth } from "../context/AuthContext";

const ShareNowPage = () => {
  const { currentUser } = useAuth();
  const [rides, setRides] = useState([]);


  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleType, setVehicleType] = useState("Sedan");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const vehicleOptions = ["Sedan", "SUV", "Hatchback", "Bike", "Van"];
  
   const fetchRides = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rides");
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

    const handleShareRide = async () => {
    if (!currentUser) {
      alert("You must be logged in to share a ride");
      return;
    }

    if (!pickup || !drop || !date || !time) {
      alert("Please fill in all the fields");
      return;
    }

    if(!currentUser){
      alert("Please sign in first")
      return;
    }

    const rideData = {
      pickup,
      drop,
      vehicleType,
      seatsLeft: parseInt(seats),
      date,
      time,
      userEmail: currentUser.email || "test@example.com",
    };

    try {
      const response = await fetch("http://localhost:8080/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        alert("Ride shared successfully!");
        // Reset form
        setPickup("");
        setDrop("");
        setVehicleType("Sedan");
        setSeats(1);
        setDate("");
        setTime("");
        fetchRides(); // ✅ Re-fetch updated list
      } else {
        const errorData = await response.text();
        alert("Failed to share ride: " + errorData);
        console.error("Server error:", errorData);
      }
    } catch (error) {
      alert("Error sharing ride: " + error.message);
      console.error("Fetch error:", error);
    }
  };


  if (!currentUser) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        You must be logged in to share a ride.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Share Your Ride</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter Pickup Location"
            className="border p-3 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
          />
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="Enter Drop Location"
            className="border p-3 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-md border-gray-300"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-3 rounded-md border-gray-300"
          />
          <input
            type="number"
            min={1}
            max={6}
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="border p-3 rounded-md border-gray-300"
            placeholder="Seats Available"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {vehicleOptions.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full border text-sm font-medium ${
                vehicleType === type
                  ? "bg-yellow-600 text-white border-yellow-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-yellow-100"
              }`}
              onClick={() => setVehicleType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={handleShareRide}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto"
        >
          Share Ride Now
        </button>
      </div>
      {rides.length === 0 ? (
  <p className="text-center text-gray-500">No rides available yet.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    {rides.map((ride) => (
      <div
        key={ride.id}
        className="border p-4 rounded-xl shadow-md bg-yellow-50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          From {ride.pickup} to {ride.drop}
        </h3>
        <p className="text-gray-600">Date: {ride.date}</p>
        <p className="text-gray-600">Time: {ride.time}</p>
        <p className="text-gray-600">Vehicle: {ride.vehicleType}</p>
        <p className="text-gray-600">Seats Left: {ride.seatsLeft}</p>
        <p className="text-gray-600 text-sm">Posted by: {ride.userEmail}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default ShareNowPage;
