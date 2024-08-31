import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AppointmentDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div
        className="text-white text-lg hover:text-slate-300 font-semibold flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUserAlt className="inline-block mr-2" />
        Appointment
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to="/doctorAppointment"
              className="block px-4 py-2 text-sm text-white-700 hover:bg-white-100 hover:text-white-900"
              role="menuitem"
              onClick={() => setIsOpen(false)} // Close the dropdown when a link is clicked
            >
              Doctor Appointment
            </Link>

            <Link
              to="/instructorAtHomeAppointment"
              className="block px-4 py-2 text-sm text-white-700 hover:bg-white-100 hover:text-white-900"
              role="menuitem"
              onClick={() => setIsOpen(false)} // Close the dropdown when a link is clicked
            >
              Instructor Appointment At Home
            </Link>

            <Link
              to="/dogAtCenter"
              className="block px-4 py-2 text-sm text-white-700 hover:bg-white-100 hover:text-white-900"
              role="menuitem"
              onClick={() => setIsOpen(false)} // Close the dropdown when a link is clicked
            >
              Dog Appointment For Center
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDropdown;
