import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const EventEdit = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const imageRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Holds the uploaded image URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`event/${eventId}`);
        const eventData = response.data;
        setPreviewUrl(eventData.image);
        if (formRef.current) {
          Object.keys(eventData).forEach((key) => {
            if (formRef.current[key]) {
              formRef.current[key].value = eventData[key];
            }
          });
        }

        if (eventData.imageUrl) {
          setPreviewUrl(eventData.imageUrl); // Load existing image
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setApiError("Failed to load event details. Please try again.");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadResponse = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPreviewUrl(uploadResponse.data); // Set uploaded image URL
      } catch (error) {
        console.error("Image upload failed", error);
        setApiError("Image upload failed. Please try again.");
      }
    }
  };

  const handleImageUpload = async () => {
    if (!imageRef.current.files.length) {
        setErrors((prev) => ({ ...prev, image: "Please select an image." }));
        return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    const formData = new FormData();
    formData.append("file", imageRef.current.files[0]);
    
    try {
        const response = await axios.post("/upload", formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("authToken")}` }
        });
        //setImageUrl(response.data);
        setPreviewUrl(response.data);
    } catch (error) {
        setApiError("Image upload failed. Please try again.");
    }
};

  const validateForm = () => {
    let newErrors = {};

    ["mela", "prasanga", "place", "location", "eventDate", "eventTime", "eventType", "category"].forEach((field) => {
      if (!formRef.current[field].value) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    const eventDetails = {};
    for (const element of formRef.current.elements) {
      if (element.name) {
        eventDetails[element.name] = element.value;
      }
    }

    eventDetails.image = previewUrl; // Store uploaded image URL


    try {
      const token = localStorage.getItem("authToken");
      const result = await axios.put(`evt/${eventId}`, eventDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Event updated successfully! Redirecting to events...");
      setTimeout(() => navigate("/events"), 2000);
    } catch (error) {
      console.error("Error updating event:", error);
      setApiError("Failed to update event. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Edit Event</h1>
        {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form ref={formRef} onSubmit={handleSubmit}>
          {["mela", "prasanga", "place", "location", "eventDate", "eventTime", "eventType", "category"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
                name={field}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Image Upload Section */}
          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Event Image</label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={imageRef}
                                type="file"
                                className="p-2 border rounded-md w-full"
                            />
                            <button
                                type="button"
                                onClick={handleImageUpload}
                                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                            >
                                Upload
                            </button>
                        </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="Event Preview" className="w-full h-40 object-cover rounded-md shadow-md" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
              Save Changes
            </button>
            <button type="button" onClick={() => navigate("/events")} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
