import React, { useRef, useState, useEffect } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const EventAdd = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSaveCall, setLoadingSaveCall] = useState(false);
  const imageRef = useRef(null);

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

  useEffect(() => {
    if (useDefaultImage) {
      fetchDefaultImage();
    } else{
      setImageUrl(null);
    }
  }, [useDefaultImage]);

  const fetchDefaultImage = async () => {
    try {
      const response = await axios.get("/default-image", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setImageUrl(response.data);
    } catch (error) {
      setApiError("Failed to fetch default image.");
    }
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

    let newErrors = {};
    Object.keys(refs).forEach((field) => {
      if (!refs[field].current.value)
        newErrors[field] = `${field} is required.`;
    });
    if (!imageUrl) {
      if(useDefaultImage){
        newErrors.image = "Default Image is not uploaded. Upload the default image and try again.";
      } else {
        newErrors.image = "Image is required.";
      }
     
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setLoadingSaveCall(false);
      return;
    }

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
      await axios.post("/evt", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Event created successfully! Redirecting to events...");
      setTimeout(() => {
        setLoadingSaveCall(false);
        navigate("/events");
      }, 2000);
    } catch (error) {
      setApiError("Event creation failed. Please try again.");
      setLoadingSaveCall(false);
    }
  };

  const onDefaultImageChange = (e) => {
    setUseDefaultImage(e.target.checked);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 mt-28">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Create Event
        </h1>
        {apiError && (
          <p className="text-red-600 text-center mb-4">{apiError}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
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
                className="mt-1 p-3 w-full border rounded-md"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={useDefaultImage}
              onChange={onDefaultImageChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-600">
              Use Default Image
            </label>
          </div>
          {errors['image'] && (
                <p className="text-red-500 text-sm m-4">{errors['image']}</p>
              )}
          {!useDefaultImage && (
            <>
              <div className="flex items-center gap-2 mb-4">
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
              <div className="mb-4 flex justify-center border border-gray-300 rounded-md p-4">
                {loadingImage ? (
                  <span>Uploading...</span>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="rounded-md max-h-40"
                  />
                ) : (
                  <span className="text-gray-400">No image uploaded</span>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventAdd;
