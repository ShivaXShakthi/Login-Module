import React, { useEffect, useState } from "react";
import axios from "./../utils/axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState("user"); // Default role is 'user'

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
  }, []);

  // Fetch user role (you can replace this with your actual logic)
  useEffect(() => {
    const fetchUserRole = async () => {
      // Simulate fetching user role
      const role = "admin"; //localStorage.getItem("userRole") || "user"; // Replace with your logic
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  // Handle View Event
  const handleView = (eventId) => {
    console.log("View Event:", eventId);
    // Navigate to event details page or show a modal
  };

  // Handle Edit Event
  const handleEdit = (eventId) => {
    console.log("Edit Event:", eventId);
    // Navigate to edit event page or show a modal
  };

  // Handle Delete Event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`events/${eventId}`); // Replace with your backend API endpoint
      setEvents(events.filter((event) => event.eventId !== eventId)); // Remove the deleted event from the list
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
  <div class="flex flex-row flex-wrap gap-6 p-8 bg-gray-100">
    {events.map((event) => {
        return (
      <     div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img
          className="w-full h-48 object-cover"
          src={event.image}
          alt={event.mela}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{event.mela}</div>
          <p className="text-gray-700 text-base">
            <strong>Prasanga:</strong> {event.prasanga}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Place:</strong> {event.place}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Date:</strong> {event.eventDate} at {event.eventTime}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Type:</strong> {event.eventType}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Category:</strong> {event.category}
          </p>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <button
            onClick={handleView}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            View
          </button>
          {userRole === "admin" && (
            <>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  })}</div>)
};

export default Events;
