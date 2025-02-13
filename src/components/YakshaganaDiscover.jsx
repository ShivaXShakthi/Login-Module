import React from "react";
import { Search } from "lucide-react"; // Using Lucide React for a clean search icon

const YakshaganaDiscover = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 text-black bg-gray-100">
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.3]">
          Discover the Best
          <br />
          <span>Yakshagana Events</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-gray-700 mt-12 max-w-3xl mx-auto leading-[1.5]">
          Explore performances from the most talented artists and troupes, bringing the rich tradition of Yakshagana to life near you.
        </p>

        {/* Search Box */}
        <div className="mt-16 w-full max-w-lg mx-auto relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full p-5 pl-5 pr-14 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-lg"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YakshaganaDiscover;
