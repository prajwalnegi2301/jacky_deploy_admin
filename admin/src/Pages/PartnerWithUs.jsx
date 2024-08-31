import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaBuilding, FaHandsHelping } from "react-icons/fa";

function PartnerWithUs() {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);


  const [requests, setRequests] = useState([]);
  
  const navigateTo = useNavigate();

  const getAllRequests = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:3000/api/v1/partnerWithUs/getAllRequests",
        { withCredentials: true }
      );
      setRequests(data.requests);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo('/login');
    }
    getAllRequests();
  }, [isAdminAuthenticated]);



  return (
    

    <div className="flex min-h-screen justify-center items-center bg-slate-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white-700">
          <FaHandsHelping className="inline-block text-purple-500 mr-2" />
          Partner with Us
        </h2>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Requests
          </h2>
          {requests && requests.length > 0 ? (
            requests.map((characteristics) => (
              <div
                key={characteristics._id}
                className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white-50"
              >
                <h3 className="text-lg flex justify-center items-center font-bold mb-2 text-purple-600">
                  {characteristics.nameOfCompany}
                </h3>

                
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Email: {characteristics.email}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Phone: {characteristics.phone}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    whyYouWantToCollab: {characteristics.whyYouWantToCollab}
                  </span>
                </div>
                
              </div>
            ))
          ) : (
            <h2 className="text-center text-white-500">
              No Request Found
            </h2>
          )}
        </div>
      
        
      </motion.div>

    </div>
  );
}

export default PartnerWithUs;


// get forms->  admin
