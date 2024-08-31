import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaClipboardList, FaExclamationCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../main";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InstructionAboutDog = () => {

  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [instructions, setInstructions] = useState([]);

  const postInstruction = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (title === "") {
      toast.error("Enter title");
    } else if (description === "") {
      toast.error("Enter description");
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/instructionAboutDog/postInstruction",
          { title, description },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );


        setTitle(''),
          setDescription('');
        toast.success("Instruction uploaded successfully");
        navigateTo("/profile");
      } catch (err) {
        toast.error("Problem uploading...");
        console.log(err);
      }
    }
  };





  const getAllDogInstructions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/instructionAboutDog/getAllInstructions",
        { withCredentials: true }
      );
      setInstructions(data.instructions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigateTo("/login")
    }
    getAllDogInstructions();
  }, [isAdminAuthenticated]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-white-700">
        Upload Instruction
      </h2>
      <form onSubmit={postInstruction}>
        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            
          >
            Title
          </label>
          <div className="flex items-center border rounded py-2 px-3">
            <FaEnvelope className="text-white-500 mr-2" />
            <input
              type="title"
              id="title"
              name="title"
              className="w-full py-1 px-2 text-white-700 leading-tight focus:outline-none"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            
          >
          Description
          </label>
          <div className="flex items-center border rounded py-2 px-3">
            <FaLock className="text-white-500 mr-2" />
            <input
              type="description"
              id="description"
              name="description"
              className="w-full py-1 px-2 text-white-700 leading-tight focus:outline-none"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
       
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>





      <div className="bg-slate-100 px-4 md:px-20 lg:px-44 py-8">
        <div className="container mx-auto min-h-screen py-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 mt-8 flex justify-center items-center">
            <FaClipboardList className="mr-4" />
            Instructions
          </h1>

          {instructions.length > 0 ? (
            instructions.map((instruction) => (
              <div
                key={instruction._id}
                className="mb-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 flex justify-center items-center text-black">
                  {instruction.title}
                </h3>

                <p className="text-lg md:text-xl lg:text-2xl mb-8 flex justify-center items-center text-black">
                  {instruction.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-white-500 flex justify-center items-center">
              <FaExclamationCircle className="mr-2 text-2xl md:text-3xl lg:text-4xl" />
              <h2 className="text-lg md:text-xl lg:text-2xl">No Instructions Found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionAboutDog;
