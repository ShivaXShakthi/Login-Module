import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../utils/axios";

const EventView = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="text-center mt-8">Event not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">{event.mela}</h1>
        <img
          src={event.image}
          alt={event.mela}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Prasanga:</strong> {event.prasanga}</p>
          <p><strong>Place:</strong> {event.place}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {event.eventDate} at {event.eventTime}</p>
          <p><strong>Type:</strong> {event.eventType}</p>
          <p><strong>Category:</strong> {event.category}</p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventView;
