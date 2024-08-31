import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineFileImage, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Context } from "../main";


const StrayDog = () => {
  const [docAvatar, setdocAvatar] = useState("");
  const [dogColor, setDogColor] = useState("");
  const [dogDesc, setdogDesc] = useState("");
  const [dogBehaviour, setDogBehaviour] = useState("");
  const [address, setAddress] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [docAvatarPreview, setdocAvatarPreview] = useState("");

  const [strayDog, setStrayDog] = useState([]);
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const getAllStrayDogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/strayDog/getAllPosts",
        { withCredentials: true }
      );
      setStrayDog(data.strayDog);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllStrayDogs();
  }, [isAdminAuthenticated]);

  return (
    


    

        //  <section className="min-h-screen mx-auto px-20 md:px-48 p-6 my-8 ">
        //   {strayDog && strayDog.length > 0 ? (
        //     strayDog.map((dog) => (
        //       <motion.div
        //         key={dog._id}
        //         initial={{ opacity: 0 }}
        //         animate={{ opacity: 1 }}
        //         transition={{ duration: 0.5 }}
        //         className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white-50"
        //       >
        //         {dog.avatar && (
        //           <motion.img
        //             src={dog.avatar.url}
        //             alt="Dog Image"
        //             className="w-full h-48 object-cover rounded mb-2"
        //             whileHover={{ scale: 1.05 }}
        //           />
        //         )}
        //         <h4 className="text-xl font-semibold text-white-700 mb-2">{dog.dogDesc}</h4>
                
        //         <div className="flex flex-wrap space-x-2 mt-2">
        //           <div className="flex items-center">
        //             <strong className="mr-1">Description:</strong> {dog.dogDesc}
        //           </div>
        //           <div className="flex items-center">
        //             <strong className="mr-1">Gender:</strong> {dog.dogGender}
        //           </div>
        //           <div className="flex items-center">
        //             <strong className="mr-1">Colour:</strong> {dog.dogColor}
        //           </div>
        //           <div className="flex items-center">
        //             <strong className="mr-1">Address:</strong> {dog.address}
        //           </div>
        //           <div className="flex items-center">
        //             <strong className="mr-1">Behaviour:</strong> {dog.dogBehaviour}
        //           </div>
        //           <div className="flex items-center">
        //             <strong className="mr-1">By User:</strong> {dog.user}
        //           </div>
        //         </div>
        //       </motion.div>
        //     ))
        //   ) : (
        //     <h2 className="text-center text-white-500">No Dogs..</h2>
        //   )}
        // </section> 

  

<section className="min-h-screen mx-auto px-6 md:px-20 lg:px-48 py-12 bg-white-100">
  {strayDog && strayDog.length > 0 ? (
    strayDog.map((dog) => (
      <motion.div
        key={dog._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 mb-8 border border-gray-300 rounded-lg shadow-lg bg-white"
      >
        {dog.avatar && (
          <motion.img
            src={dog.avatar.url}
            alt="Dog Image"
            className=" object-cover rounded mb-4"
            whileHover={{ scale: 1.05 }}
          />
        )}
        <h4 className="text-2xl font-bold text-white-800 mb-4">{dog.dogDesc}</h4>

        <div className="flex flex-col space-y-2 text-white-700">
          <div className="flex items-center">
            <strong className="mr-1">Description:</strong> {dog.dogDesc}
          </div>
          <div className="flex items-center">
            <strong className="mr-1">Gender:</strong> {dog.dogGender}
          </div>
          <div className="flex items-center">
            <strong className="mr-1">Colour:</strong> {dog.dogColor}
          </div>
          <div className="flex items-center">
            <strong className="mr-1">Address:</strong> {dog.address}
          </div>
          <div className="flex items-center">
            <strong className="mr-1">Behaviour:</strong> {dog.dogBehaviour}
          </div>
          <div className="flex items-center">
            <strong className="mr-1">By User:</strong> {dog.user}
          </div>
        </div>
      </motion.div>
    ))
  ) : (
    <h2 className="text-center text-2xl text-white-500">No Dogs Available</h2>
  )}
</section>

    
    


    
  );
};

export default StrayDog;
