import React, { useContext, useEffect, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { Eye, Pencil, Trash2, BadgePlus, Search } from "lucide-react";

const Events = () => {
  const { authtoken, roles } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(authtoken);
  const userRole = roles || []; // Ensure roles are not null
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const handleView = (eventId) => navigate(`/eventview/${eventId}`);
  const handleEdit = (eventId) => navigate(`/eventedit/${eventId}`);
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddEvent = () => navigate("/eventadd");
  const isAdmin = () => userRole.includes("ROLE_ADMIN");

  // Function to fetch search results
  const handleSearch = async () => {
    if (!searchQuery.trim()){
      fetchEvents();
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

  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-28">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-8 px-4 sm:px-0 gap-y-4">
  {/* Title */}
  <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
    Yakshagana Events
  </h1>

  {/* Search Box - Always together with Search Button */}
  <div className="relative w-full sm:w-[400px]">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for prasanga, mela, or location..."
      className="w-full p-4 pl-5 pr-14 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-lg"
      onKeyUp={handleSearch}
    />
    <button
      onClick={handleSearch}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
    >
      <Search className="h-5 w-5" />
    </button>
  </div>

  {/* Admin Button - Stays to the right */}
  {isAdmin() && (
    <button
      onClick={handleAddEvent}
      className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
    >
      <BadgePlus />
    </button>
  )}
</div>



      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl place-items-center">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300"
            >
              <img
                className="w-full h-40 object-cover"
                src={event.image}
                alt={event.mela}
              />
              <div className="p-6">
                <h2
                  onClick={() => handleView(event.eventId)}
                  className="font-bold text-xl text-blue-600 cursor-pointer"
                >
                  {event.prasanga}
                </h2>
                <p className="text-gray-700 mt-2">
                  <strong>Place:</strong> {event.place}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {event.eventDate} at {event.eventTime}
                </p>
              </div>
              <div className="p-6 flex justify-between">
                {isAdmin() && (
                  <>
                    <button
                  onClick={() => handleView(event.eventId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  <Eye />
                </button>
                    <button
                      onClick={() => handleEdit(event.eventId)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => handleDelete(event.eventId)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      <Trash2 />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-xl text-gray-600">No events available. Create one now!</p>
          {isAdmin() && (
            <button
              onClick={handleAddEvent}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
