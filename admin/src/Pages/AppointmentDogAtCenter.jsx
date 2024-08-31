import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaDog, FaImage, FaInfoCircle, FaWeightHanging, FaRegCalendarCheck } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../main";


const AppointmentDogAtCenter = () => {
    const { isAdminAuthenticated } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  
  
  const [pendingStatus, setPendingStatus] = useState(0);
  const [acceptedStatus, setAcceptedStatus] = useState(0);
  const [rejectedStatus, setRejectedStatus] = useState(0);

  const navigateTo = useNavigate();

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/dogAtCenter/getAllServices/centerVisit",
        { withCredentials: true }
      );
      setAppointments(data.appointments);
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
        `http://localhost:3000/api/v1/dogAtCenter/updateAppointment/${appointmentId}`,
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
    // <section className="mt-8 min-h-screen w-full max-w-2xl">
    //    <div className="text-white-700">
    //       <p className="text-lg font-semibold">Total Appointments</p>
    //       <div className="flex mt-2">
    //         <div className="mr-4">
    //           <h3 className="text-xl font-semibold text-yellow-400">
    //             Pending: {pendingStatus}
    //           </h3>
    //         </div>
    //         <div className="mr-4">
    //           <h3 className="text-xl font-semibold text-green-600">
    //             Accepted: {acceptedStatus}
    //           </h3>
    //         </div>
    //         <div>
    //           <h3 className="text-xl font-semibold text-red-600">
    //             Rejected: {rejectedStatus}
    //           </h3>
    //         </div>
    //       </div>
    //     </div>
    //   {appointments && appointments.length > 0 ? (
    //     appointments.map((appointment) => (
    //       <div key={appointment._id} className="bg-white py-6 px-12 shadow-xl rounded-lg  my-4">
    //         {appointment.docAvatar && (
    //           <img src={appointment.docAvatar.url} alt="blogImg" className="w-32 h-32 object-cover rounded-full mb-4" />
    //         )}
    //         <div className="text-purple-700">
    //           <h4 className="font-bold mb-1">Name: {appointment.dogName}</h4>
    //           <p className="mb-1">Age: {appointment.dogAge}</p>
    //           <p className="mb-1">Gender: {appointment.dogGender}</p>
    //           <p className="mb-1">Stay Duration: {appointment.dogStayDuration}</p>
    //           <p className="mb-1">Date: {appointment.date}</p>
    //           <p className="mb-1">Breed: {appointment.dogBreed}</p>
    //           <p className="mb-1">Weight: {appointment.dogWeight}</p>
    //           <p className="mb-1">Nature: {appointment.dogNature}</p>
    //           <p className="mb-1">Animal Aggression: {appointment.animalAggression}</p>
    //         </div>

    //         <div className="ml-auto">
    //             <select
    //               className={`p-2 rounded-md ${
    //                 appointment.status === "Pending"
    //                   ? "bg-yellow-200 text-yellow-800"
    //                   : appointment.status === "Accepted"
    //                   ? "bg-green-200 text-green-800"
    //                   : "bg-red-200 text-red-800"
    //               }`}
    //               value={appointment.status}
    //               onChange={(e) =>
    //                 handleUpdateStatus(appointment._id, e.target.value)
    //               }
    //             >
    //               <option value="Pending">Pending</option>
    //               <option value="Accepted">Accepted</option>
    //               <option value="Rejected">Rejected</option>
    //             </select>
    //           </div>
    //       </div>
    //     ))
    //   ) : (
    //     <p className="text-center text-purple-700 text-xl font-bold">No appointments..</p>
    //   )}
    // </section>


    <section className="mt-8 min-h-screen w-full max-w-2xl mx-auto">
  <div className="text-white-700">
    <p className="text-lg font-semibold mb-4">Total Appointments</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2">
          Pending: {pendingStatus}
        </h3>
        {/* Additional details for pending status if needed */}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Accepted: {acceptedStatus}
        </h3>
        {/* Additional details for accepted status if needed */}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-red-600 mb-2">
          Rejected: {rejectedStatus}
        </h3>
        {/* Additional details for rejected status if needed */}
      </div>
    </div>
  </div>

  {appointments && appointments.length > 0 ? (
    <div className="mt-8 grid gap-4">
      {appointments.map((appointment) => (
        <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-xl">
          <div className="flex items-center mb-4">
            {appointment.docAvatar && (
              <img
                src={appointment.docAvatar.url}
                alt="Dog Avatar"
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
            )}
            <div className="text-purple-700">
              <h4 className="font-bold mb-1">Name: {appointment.dogName}</h4>
              <p className="mb-1">Age: {appointment.dogAge}</p>
              <p className="mb-1">Gender: {appointment.dogGender}</p>
              <p className="mb-1">Stay Duration: {appointment.dogStayDuration}</p>
              <p className="mb-1">Date: {appointment.date}</p>
              <p className="mb-1">Breed: {appointment.dogBreed}</p>
              <p className="mb-1">Weight: {appointment.dogWeight}</p>
              <p className="mb-1">Nature: {appointment.dogNature}</p>
              <p className="mb-1">Animal Aggression: {appointment.animalAggression}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <select
              className={`px-4 py-2 rounded-md text-white font-semibold ${
                appointment.status === "Pending"
                  ? "bg-yellow-500"
                  : appointment.status === "Accepted"
                  ? "bg-green-500"
                  : "bg-red-500"
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
      ))}
    </div>
  ) : (
    <p className="text-center text-purple-700 text-xl font-bold mt-8">No appointments.</p>
  )}
</section>




  );

};

export default AppointmentDogAtCenter;
