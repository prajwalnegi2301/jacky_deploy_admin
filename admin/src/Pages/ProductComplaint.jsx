import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBarcode, FaBoxOpen, FaUtensils, FaExclamationTriangle, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductComplaint = () => {
  const { isUserAuthenticated, setIsUserAuthenticated } = useContext(Context);
  
  const navigateTo = useNavigate();

  

  //   if(!isUserAuthenticated){
  //     navigateTo("/login");
  //   }

  return (
  
   <div></div>
  );
};

export default ProductComplaint;
