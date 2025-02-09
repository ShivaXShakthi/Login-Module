import React, { useEffect, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const EventEdit = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    mela: "",
    prasanga: "",
    place: "",
    location: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    category: ""
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch event details to pre-fill the form
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`event/${eventId}`);
        setFormData(response.data); // Pre-fill the form with the event's current details
      } catch (error) {
        console.error("Error fetching event details:", error);
        alert("Failed to load event details. Please try again.");
      }
    };

    fetchEvent();
  }, [eventId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("eventDetails",JSON.stringify(formData));
      payload.append("image", image); // Append the image file
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`event/${eventId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("Event updated successfully:", response.data);
      navigate("/events"); // Navigate back to the events page after successful update
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/events"); // Navigate back to the events page
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mela Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mela</label>
            <input
              type="text"
              name="mela"
              value={formData.mela}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Prasanga Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Prasanga</label>
            <input
              type="text"
              name="prasanga"
              value={formData.prasanga}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Place Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Event Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Event Time Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Event Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <input
              type="text"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL Field */}
          <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} required />
      </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;