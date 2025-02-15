import React, { useState, useRef, useEffect } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const DefaultImageUpload = () => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSaveCall, setLoadingSaveCall] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDefaultImage = async () => {
      try {
        const response = await axios.get("/default-image", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setImageUrl(response.data);
      } catch (error) {
        console.error("Error fetching default image:", error);
      }
    };
    fetchDefaultImage();
  }, []);

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
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setImageUrl(response.data);
    } catch (error) {
      setErrors((prev) => ({ ...prev, api: "Image upload failed. Please try again." }));
    } finally {
      setLoadingImage(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image before saving." }));
      return;
    }
    setLoadingSaveCall(true);
    try {
      await axios.post(
        "/default-image",
        { imageUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      navigate("/events");
    } catch (error) {
      setErrors((prev) => ({ ...prev, api: "Failed to save image. Please try again." }));
    } finally {
      setLoadingSaveCall(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={onSubmit} className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Default Image</h2>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2"></label>
          <div className="flex items-center gap-3">
            <input
              ref={imageRef}
              type="file"
              className="block w-full p-3 border border-gray-300 rounded-lg text-gray-700"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Upload
            </button>
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Image Preview */}
        <div className="mt-4 flex justify-center items-center h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          {loadingImage ? (
            <div className="flex items-center">
              <svg className="animate-spin h-6 w-6 text-blue-500 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span className="text-gray-600">Uploading...</span>
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt="Event Preview" className="object-cover max-h-48 w-full rounded-lg" />
          ) : (
            <span className="text-gray-400">No image uploaded</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            disabled={loadingSaveCall}
          >
            {loadingSaveCall ? "Saving..." : "Save default image"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
          >
            Cancel
          </button>
        </div>

        {/* API Error */}
        {errors.api && <p className="text-red-500 text-sm mt-3 text-center">{errors.api}</p>}
      </form>
    </div>
  );
};

export default DefaultImageUpload;
