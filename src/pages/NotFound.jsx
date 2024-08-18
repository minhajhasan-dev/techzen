import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center">
      <p className="text-2xl">404 - Not Found</p>
      <Link to="/" className="text-blue-500">
        <FaHome className="inline-block" /> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
