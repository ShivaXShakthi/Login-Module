import React, { useState } from "react";
import { Search } from "lucide-react"; // Using Lucide React for a clean search icon
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const YakshaganaDiscover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch search results
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setEvents([]); // Clear events if search query is empty
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(`/search`, {
        params: { query: searchQuery }, // API should handle filtering by prasanga, mela, or location
      });

      setEvents(response.data); // Store events in state
    } catch (error) {
      console.error("Error fetching search results:", error);
      setEvents([]); // Clear events on error
    } finally {
      setLoading(false);
    }
  };

  const handleView = (eventId) => navigate(`/eventview/${eventId}`);

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 text-black mt-28">
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-normal leading-[1.3]">
          Discover the Best
          <br />
          <span>Yakshagana Events</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-gray-700 mt-12 max-w-3xl mx-auto leading-[1.5]">
          Explore performances from the most talented artists and troupes,
          bringing the rich tradition of Yakshagana to life near you.
        </p>

        {/* Search Box */}
        <div className="mt-16 w-full max-w-lg mx-auto relative">
          <input
            onKeyUp={handleSearch}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for prasanga, mela, or location..."
            className="w-full p-5 pl-5 pr-14 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-lg"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        {/* Search Results */}
        <div className="mt-12 w-full max-w-4xl mx-auto">
          {loading && <p className="text-gray-500">Searching...</p>}

          {!loading && events.length === 0 && searchQuery && (
            <p className="text-gray-500">
              No events found for "{searchQuery}".
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.eventId}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={event.image}
                  alt={event.mela}
                />
                <div className="px-6 py-4">
                  <h3
                    onClick={() => handleView(event.eventId)}
                    className="font-bold text-lg text-blue-500 cursor-pointer"
                  >
                    {event.prasanga}
                  </h3>
                  <p className="text-gray-700">
                    <strong>Mela:</strong> {event.mela}
                  </p>
                  <p className="text-gray-700">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-700">
                    <strong>Date:</strong> {event.eventDate} at{" "}
                    {event.eventTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YakshaganaDiscover;
