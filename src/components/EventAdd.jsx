import React, { useRef, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const EventAdd = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");
    
    const mela = useRef(null);
    const prasanga = useRef(null);
    const place = useRef(null);
    const location = useRef(null);
    const eventDate = useRef(null);
    const eventTime = useRef(null);
    const eventType = useRef(null);
    const category = useRef(null);
    const image = useRef(null);

    const validateForm = () => {
        let newErrors = {};

        if (!mela.current.value) newErrors.mela = "Mela is required.";
        if (!prasanga.current.value) newErrors.prasanga = "Prasanga is required.";
        if (!place.current.value) newErrors.place = "Place is required.";
        if (!location.current.value) newErrors.location = "Location is required.";
        if (!eventDate.current.value) newErrors.eventDate = "Event date is required.";
        if (!eventTime.current.value) newErrors.eventTime = "Event time is required.";
        if (!eventType.current.value) newErrors.eventType = "Event type is required.";
        if (!category.current.value) newErrors.category = "Category is required.";
        if (!image.current.files.length) newErrors.image = "Image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onEventSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validateForm()) return;

        let payload = new FormData();
        payload.append("eventDetails", JSON.stringify({
            mela: mela.current.value,
            prasanga: prasanga.current.value,
            place: place.current.value,
            location: location.current.value,
            eventDate: eventDate.current.value,
            eventTime: eventTime.current.value,
            eventType: eventType.current.value,
            category: category.current.value
        }));
        payload.append("image", image.current.files[0]);

        try {
            await axios.post("event", payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            setSuccess("Event created successfully! Redirecting to events...");
            setTimeout(() => navigate("/events"), 2000);
        } catch (error) {
            setApiError("Event creation failed. Please try again.");
        }
    };

    const onCancel = () => {
        navigate("/events");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Event</h1>
                {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form>
                    {["mela", "prasanga", "place", "location", "eventDate", "eventTime", "eventType", "category"].map((field) => (
                        <div key={field} className="mb-4">
                            <label htmlFor={field} className="block text-sm font-medium text-gray-600">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                ref={{ mela, prasanga, place, location, eventDate, eventTime, eventType, category }[field]}
                                type={field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
                                id={field}
                                name={field}
                                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                        </div>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">Event Image</label>
                        <input
                            ref={image}
                            type="file"
                            id="image"
                            name="image"
                            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>
                    <div className="flex gap-4">
                        <button onClick={onEventSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                            Create Event
                        </button>
                        <button type="button" onClick={onCancel} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventAdd;
