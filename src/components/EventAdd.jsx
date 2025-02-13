import React, { useRef, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const EventAdd = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const imageRef = useRef(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSaveCall, setLoadingSaveCall] = useState(false);

  const refs = {
    mela: useRef(null),
    prasanga: useRef(null),
    place: useRef(null),
    location: useRef(null),
    eventDate: useRef(null),
    eventTime: useRef(null),
    eventType: useRef(null),
    category: useRef(null),
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(refs).forEach((field) => {
      if (!refs[field].current.value)
        newErrors[field] = `${field} is required.`;
    });
    if (!imageUrl) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async () => {
    if (!imageRef.current.files.length) {
      setErrors((prev) => ({ ...prev, image: "Please select an image." }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", imageRef.current.files[0]);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setImageUrl(response.data);
    } catch (error) {
      setApiError("Image upload failed. Please try again.");
    } finally {
      setLoadingImage(false);
    }
  };

  const onEventSubmit = async (e) => {
    e.preventDefault();
    setLoadingSaveCall(true);
    setApiError("");
    if (!validateForm()) return;

    const payload = {
      mela: refs.mela.current.value,
      prasanga: refs.prasanga.current.value,
      place: refs.place.current.value,
      location: refs.location.current.value,
      eventDate: refs.eventDate.current.value,
      eventTime: refs.eventTime.current.value,
      eventType: refs.eventType.current.value,
      category: refs.category.current.value,
      image: imageUrl,
    };

    try {
      const result = await axios.post("/evt", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Event created successfully! Redirecting to events...");
      setTimeout(() => {
        setLoadingSaveCall(false);
        navigate("/events")
      }, 2000);
    } catch (error) {
      setApiError("Event creation failed. Please try again.");
      setLoadingSaveCall(false);
    }
  };

  return (
    <div className="relative">
      {/* Full Page Loading Overlay */}
      {loadingSaveCall && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="text-white flex flex-col items-center">
          <svg className="animate-spin-fast h-20 w-20 text-white mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="text-lg font-semibold">Creating Event...</p>
          </div>
        </div>
      )}
  
      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen p-4 mt-28">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Create Event
          </h1>
          {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={onEventSubmit}>
            {Object.keys(refs).map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  ref={refs[field]}
                  type={
                    field.includes("Date")
                      ? "date"
                      : field.includes("Time")
                      ? "time"
                      : "text"
                  }
                  className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Event Image</label>
              <div className="flex items-center gap-2">
                <input ref={imageRef} type="file" className="p-2 border rounded-md w-full" />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              <div className="mt-2 flex justify-center items-center h-40 border border-gray-300 rounded-md">
                {loadingImage ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-6 w-6 text-blue-500 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span className="text-gray-600">Uploading...</span>
                  </div>
                ) : imageUrl ? (
                  <img src={imageUrl} alt="Event Preview" className="rounded-md max-h-40" />
                ) : (
                  <span className="text-gray-400">No image uploaded</span>
                )}
              </div>
            </div>
  
            <div className="flex gap-4">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md">
                Create Event
              </button>
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  
};

export default EventAdd;
