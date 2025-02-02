import React, { useEffect, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  //const [userRole, setUserRole] = useState("user"); // Default role is 'user'
  const navigate = useNavigate();

  //const token = localStorage.getItem("authToken");

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:9090/events"); // Replace with your backend API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch user role (you can replace this with your actual logic)
  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     // Simulate fetching user role
  //     const role = "admin"; //localStorage.getItem("userRole") || "user"; // Replace with your logic
  //     setUserRole(role);
  //   };

  //   fetchUserRole();
  // }, []);

  // Handle View Event
  const handleView = (eventId) => {
    console.log("View Event:", eventId);
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
      console.log(token);
      //let result = await axios.delete(`http://localhost:9090/event/${eventId}`,{
        let result = await axios.delete(`event/${eventId}`,{
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      }); // Replace with your backend API endpoint
      setEvents(events.filter((event) => event.eventId !== eventId)); // Remove the deleted event from the list
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle Add Event
  const handleAddEvent = () => {
    navigate("/eventadd"); // Navigate to the add event page
  };

  const idAdmin = () => {
    if(localStorage.getItem("roles") == null){
      return false;
    }
    return localStorage.getItem("roles").toString().includes("ROLE_ADMIN");
  }



  return (
    <>
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        {idAdmin() && (
          <button
            onClick={handleAddEvent}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Add Event
          </button>
        )}
      </div>
  <div className="flex flex-row flex-wrap gap-6 p-8 bg-gray-100">
    
    {events.map((event) => {
        return (
      <     div key={event.eventId} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
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
            onClick={()=>handleView(event.eventId)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            View
          </button>
          {idAdmin() && (
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
