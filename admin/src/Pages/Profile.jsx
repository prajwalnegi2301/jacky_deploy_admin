import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";


const Profile = () => {
  const { isAdminAuthenticated, setIsAdminAuthenticated, admin } =
    useContext(Context);
  const navigateTo = useNavigate();

  const deleteCustomer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/api/v1/admin/deleteAdmin",
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAdminAuthenticated(false);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

useEffect(() => {
  
  if(!isAdminAuthenticated){
    navigateTo("/login")
  }
}, [isAdminAuthenticated]);


  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 py-24 to-slate-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full"
      >
        <div className="flex justify-center py-6 bg-purple-200">
          <motion.img
            src={admin.avatar && admin.avatar.url ? admin.avatar.url : "default-image-url"}
            alt="Profile Image"
            className="h-48 w-48 object-cover shadow-xl rounded-full"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="py-6 px-10">
          <div className="text-center text-3xl font-bold text-white-800 mb-4">
            {admin.name}
          </div>
          <div className="flex flex-col text-white-700">
            <div className="mb-2">
              <strong>Role:</strong> {admin.role}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {admin.email}
            </div>
            <div className="mb-2">
              <strong>Phone:</strong> {admin.phone}
            </div>
            <div className="mb-2">
              <strong>Gender:</strong> {admin.gender}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-6 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={deleteCustomer}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            <RiDeleteBin6Line className="mr-2 text-xl" /> Delete Account
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
