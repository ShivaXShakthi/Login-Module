import React, { useContext, useEffect, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Events = () => {
  const { authtoken, roles, login, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(roles); // Default role is 'user'
  const navigate = useNavigate();
  const [token, setToken] = useState(authtoken);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("events"); // Replace with your backend API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [token]);

  // Handle View Event
  const handleView = (eventId) => {
    navigate(`/eventview/${eventId}`); // Navigate to the event view page
    // Navigate to event details page or show a modal
  };

  // Handle Edit Event
  const handleEdit = (eventId) => {
    console.log("Edit Event:", eventId);
    navigate(`/eventedit/${eventId}`);
    // Navigate to edit event page or show a modal
  };



  // Handle Delete Event
  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("authToken");
      let result = await axios.delete(`event/${eventId}`,{
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      }); // Replace with your backend API endpoint
      setEvents(events.filter((event) => event.eventId !== eventId)); // Remove the deleted event from the list
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle Add Event
  const handleAddEvent = () => {
    navigate("/eventadd"); // Navigate to the add event page
  };

  const isAdmin = () => {
    if(userRole == null){
      return false;
    }
    return userRole.includes("ROLE_ADMIN");
  }



  return (
    <>
    <div className="flex justify-between items-center mb-6 px-4 mt-28">
        <h1 className="text-3xl font-bold"></h1>
        {isAdmin() && (
          <button
            onClick={handleAddEvent}
            className="bg-gray-500 rounded-full text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Add Event
          </button>
        )}
      </div>
  <div className="flex flex-row flex-wrap gap-6 px-4">
    
    {events.map((event) => {
        return (
      <     div key={event.eventId} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-32">
            <img
          className="w-full h-full object-cover object-top"
          src={event.image}
          alt={event.mela}
        />
            </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-blue-400">{event.prasanga}</div>
          {/* <p className="text-gray-700 text-base">
            <strong>Mela:</strong> {event.mela}
          </p> */}
          <p className="text-gray-700 text-base">
            <strong>Place:</strong> {event.place}
          </p>
          {/* <p className="text-gray-700 text-base">
            <strong>Location:</strong> {event.location}
          </p> */}
          <p className="text-gray-700 text-base">
            <strong>Date:</strong> {event.eventDate} at {event.eventTime}
          </p>
          {/* <p className="text-gray-700 text-base">
            <strong>Type:</strong> {event.eventType}
          </p> */}
          {/* <p className="text-gray-700 text-base">
            <strong>Category:</strong> {event.category}
          </p> */}
        </div>
        <div className="px-6 py-4 flex justify-between">
          <button
            onClick={()=>handleView(event.eventId)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            View
          </button>
          {isAdmin() && (
            <>
              <button
                onClick={()=>handleEdit(event.eventId)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={()=>handleDelete(event.eventId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  })}</div>
  </>)
};

export default Events;
