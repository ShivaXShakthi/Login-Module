import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../utils/axios";

const EventView = () => {
    const { eventId } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    // Fetch event details from the backend
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`event/${eventId}`);
          setEvent(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching event details:", error);
          setError("Failed to load event details. Please try again.");
          setLoading(false);
        }
      };
  
      fetchEvent();
    }, [eventId]);

    // Handle Back Button Click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };
  
    if (loading) {
      return <div className="text-center mt-8">Loading event details...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-8 text-red-500">{error}</div>;
    }
  
    if (!event) {
      return <div className="text-center mt-8">Event not found.</div>;
    }
  
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
          <h1 className="text-3xl font-bold mb-4">{event.mela}</h1>
          <img
            src={event.image}
            alt={event.mela}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div className="space-y-4">
            <p>
              <strong>Prasanga:</strong> {event.prasanga}
            </p>
            <p>
              <strong>Place:</strong> {event.place}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date:</strong> {event.eventDate} at {event.eventTime}
            </p>
            <p>
              <strong>Type:</strong> {event.eventType}
            </p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>
          </div>
          <button
          onClick={handleBack}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Back
        </button>
        </div>
        
      </div>
    );
  };
  
  export default EventView;
  