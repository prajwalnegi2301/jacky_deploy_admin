import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiMail,
  TiPhone,
} from "react-icons/ti";
import { Context } from "../main";
import {useNavigate} from 'react-router-dom'

function Contact() {

  const { isAdminAuthenticated } = useContext(Context);
  const [connectMessages, setConnectMessages] = useState([]);

  const navigateTo = useNavigate();

  const getAllMessages = async () => {
   
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/connect/getConnectMessages",
        { withCredentials: true }
      );
      setConnectMessages(data.connectMessages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllMessages();
  }, [isAdminAuthenticated]);


  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-20 md:mx-60 m-6 rounded-xl p-6 min-h-screen">
    <div className="container mx-auto pt-16 pb-10">
      <motion.div whileHover={{ scale: 1.1 }} className="text-center">
        <h1 className="text-4xl text-slate-800 font-bold mb-8 mt-16">Messages</h1>
      </motion.div>
      {connectMessages && connectMessages.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {connectMessages.map((appointment) => (
            <motion.div
              key={appointment._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white  p-6 rounded-lg shadow-xl transition-transform duration-300"
            >
              <div className="flex items-center mx-auto mb-4">
                <div className="text-purple-700">
                  <h4 className="font-bold mb-1">Name: {appointment.name}</h4>
                  <p className="mb-1">Message: {appointment.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-purple-700 text-xl font-bold mt-8">No Messages.</p>
      )}
      <ToastContainer position="top-center" />
      <div className="flex justify-center space-x-8 mt-16">
        <TiSocialFacebook className="w-10 h-10 text-purple-700 hover:text-purple-900 transition-colors duration-300" />
        <TiSocialLinkedin className="w-10 h-10 text-purple-700 hover:text-purple-900 transition-colors duration-300" />
        <TiSocialTwitter className="w-10 h-10 text-purple-700 hover:text-purple-900 transition-colors duration-300" />
        <TiMail className="w-10 h-10 text-purple-700 hover:text-purple-900 transition-colors duration-300" />
        <TiPhone className="w-10 h-10 text-purple-700 hover:text-purple-900 transition-colors duration-300" />
      </div>
    </div>
  </div>
  )
}

export default Contact;
