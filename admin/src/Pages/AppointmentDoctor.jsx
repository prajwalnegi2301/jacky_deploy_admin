import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaUser, FaClipboardList } from "react-icons/fa";
import { useContext } from "react";
import { Context } from '../main';

const AppointmentDoctor = () => {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [pendingStatus, setPendingStatus] = useState(0);
  const [acceptedStatus, setAcceptedStatus] = useState(0);
  const [rejectedStatus, setRejectedStatus] = useState(0);

  
    const getAllAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/appointmentWithDoctor/getAllAppointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments || []);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      
      if(!isAdminAuthenticated){
        navigateTo("/login");
      }
      getAllAppointments();
    }, [isAdminAuthenticated]);


  useEffect(() => {
    let countP = 0;
    let countA = 0;
    let countR = 0;

    appointments.forEach((appointment) => {
      if (appointment.status === "Pending") {
        countP++;
      } else if (appointment.status === "Accepted") {
        countA++;
      } else if (appointment.status === "Rejected") {
        countR++;
      }
    });

    setPendingStatus(countP);
    setAcceptedStatus(countA);
    setRejectedStatus(countR);
  }, [appointments]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/appointmentWithDoctor/updateAppointmentWithDoctor/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
      toast.success(response.data.appointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error(error.response?.data?.appointment || "An error occurred");
    }
  };

  return (
    <div className="bg-white p-6 min-h-screen rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="text-white-700">
          <p className="text-lg font-semibold">Total Appointments</p>
          <div className="flex mt-2">
            <div className="mr-4">
              <h3 className="text-xl font-semibold text-yellow-400">
                Pending: {pendingStatus}
              </h3>
            </div>
            <div className="mr-4">
              <h3 className="text-xl font-semibold text-green-600">
                Accepted: {acceptedStatus}
              </h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600">
                Rejected: {rejectedStatus}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <FaClipboardList className="w-16 h-16 text-purple-600" />
        </div>
      </div>
      <hr className="my-4" />
      <div>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} className="flex items-start px-12  mb-12 py-4-6">
              {appointment.docAvatar && (
                <img
                  src={appointment.docAvatar.url}
                  alt="Doctor Avatar"
                  className="w-40 h-40 rounded-full mr-4"
                />
              )}
              <div>
                <div className="flex text-xl items-center mb-1 mt-4 ml-4">
                  <FaClock className="text-white-900 mr-2" />
                  <span className="text-white-700">{appointment.timeApp}</span>
                </div>
                <div className="flex text-xl items-center mb-1 mt-2 ml-4">
                  <FaCalendarAlt className="text-white-900 mr-2" />
                  <span className="text-white-700">{appointment.dateApp}</span>
                </div>
                <p className="text-white-900 text-lg ml-4 mt-2">{appointment.desc}</p>
              </div>
              <div className="ml-auto">
                <select
                  className={`p-2 rounded-md ${
                    appointment.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : appointment.status === "Accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                  value={appointment.status}
                  onChange={(e) =>
                    handleUpdateStatus(appointment._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white-600">No appointments scheduled.</p>
        )}
      </div>
    </div>

  );
};

export default AppointmentDoctor;

