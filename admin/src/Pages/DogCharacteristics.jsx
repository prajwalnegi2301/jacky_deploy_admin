import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaRegImage,
  FaDog,
  FaCalendarAlt,
  FaRulerCombined,
  FaUserFriends,
  FaWeightHanging,
  FaHeart,
  FaBolt,
  FaWalking,
  FaSave,
} from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../main";

const DogCharacteristics = () => {
  const [dogCharacteristics, setDogCharacteristics] = useState([]);

  const [coat, setCoat] = useState("");
  const [size, setSize] = useState("");
  const [temperament, setTemperament] = useState("");
  const [breed, setBreed] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [exerciseNeeds, setExerciseNeeds] = useState("");
  const [image1Avatar, setImage1Avatar] = useState("");
  const [image1AvatarPreview, setImage1AvatarPreview] = useState("");
  const [trainingNeeds, setTrainingNeeds] = useState("");
  const [nature, setNature] = useState("");
  const [animalAggression, setAnimalAggression] = useState("");

  const{isAdminAuthenticated,setIsAdminAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const getAllDogCharacteristics = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:3000/api/v1/dogCharacteristics/getAllBreeds",
        { withCredentials: true }
      );
      setDogCharacteristics(data.dogCharacteristics);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarImage1 = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      setFile(file);
    };
  };

  const addDogCharacteristics = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("coat", coat);
      formData.append("size", size);
      formData.append("temperament", temperament);
      formData.append("breed", breed);
      formData.append("energyLevel", energyLevel);
      formData.append("exerciseNeeds", exerciseNeeds);
      formData.append("image1Avatar", image1Avatar);
      formData.append("trainingNeeds", trainingNeeds);
      formData.append("nature", nature);
      formData.append("animalAggression", animalAggression);
    
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/dogCharacteristics/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      getAllDogCharacteristics();
      toast.success(data.message);
      setCoat("");
      setSize("");
      setTemperament("");
      setEnergyLevel("");
      setBreed("");
      setExerciseNeeds("");
      setImage1Avatar("");
      setImage1AvatarPreview("");
      setTrainingNeeds("");
      setNature("");
      setAnimalAggression("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllDogCharacteristics();
  }, [isAdminAuthenticated]);

  return (


<div className="bg-slate-200 p-8 min-h-screen flex flex-col items-center">
      <div className="max-w-2xl bg-white mx-auto mt-10 p-6 shadow-md rounded-lg">
       
         <h1 className="text-3xl font-bold text-purple-600 mb-6 mt-12 text-center">
          Create Dog Characteristics
        </h1>
        
        <form onSubmit={addDogCharacteristics} className="space-y-4">

          <div className="flex flex-col items-center">
            <img
              src={image1AvatarPreview ? image1AvatarPreview : "/docHolder.jpg"}
              alt="Image1 Avatar"
              className="w-32 h-32 rounded-full bg-purple-200 text-white object-cover mb-4"
            />
            <label className="flex items-center cursor-pointer bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
              <FaRegImage className="mr-2" /> Upload Image
              <input
                type="file"
                onChange={(e)=>handleAvatarImage1(e,setImage1AvatarPreview,setImage1Avatar)}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center mb-4">
            <select
              value={coat}
              onChange={(e) => setCoat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Coat</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <select
              value={exerciseNeeds}
              onChange={(e) => setExerciseNeeds(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Exercise Needs</option>
              <option value="LessNeeded">Less Needed</option>
              <option value="DailyNeeded">Daily Needed</option>
              <option value="DailyTwoTimes">Daily Two Times</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaDog className="mr-2 text-purple-500" />
            <input
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center mb-4">
            <FaHeart className="mr-2 text-purple-500" />
            <select
              value={temperament}
              onChange={(e) => setTemperament(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Temperament</option>
              <option value="Friendly">Friendly</option>
              <option value="Aggressive">Aggressive</option>
              <option value="AnimalAggressive">Animal Aggressive</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaBolt className="mr-2 text-purple-500" />
            <select
              value={energyLevel}
              onChange={(e) => setEnergyLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Energy Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaUserFriends className="mr-2 text-purple-500" />
            <select
              value={animalAggression}
              onChange={(e) => setAnimalAggression(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Animal Aggression</option>
              <option value="Not">Not</option>
              <option value="Yes">Yes</option>
              <option value="NotMuch">Not Much</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaWalking className="mr-2 text-purple-500" />
            <select
              value={nature}
              onChange={(e) => setNature(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Nature</option>
              <option value="FriendlyWithEveryone">Friendly With Everyone</option>
              <option value="NotFriendlyWithOtherDogs">Not Friendly With Other Dogs</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaCalendarAlt className="mr-2 text-purple-500" />
            <select
              value={trainingNeeds}
              onChange={(e) => setTrainingNeeds(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Training Requirements</option>
              <option value="Daily1Hour">Daily 1 Hour</option>
              <option value="Daily2Hour">Daily 2 Hours</option>
              <option value="Daily3Hour">Daily 3 Hours</option>
              <option value="Daily4Hour">Daily 4 Hours</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
          >
            <FaSave className="mr-2" /> Add Dog Characteristics
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Dog Characteristics
          </h2>
          {dogCharacteristics && dogCharacteristics.length > 0 ? (
            dogCharacteristics.map((characteristics) => (
              <div
                key={characteristics._id}
                className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white-50"
              >
                <h3 className="text-lg flex justify-center items-center font-bold mb-2 text-purple-600">
                  {characteristics.breed}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Image */}
                  <img
                    src={
                      characteristics.image1Avatar &&
                      characteristics.image1Avatar.url
                    }
                    alt="characteristics Image 1"
                    className=" my-2 object-cover rounded "
                  />
                </div>

                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Coat: {characteristics.coat}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Size: {characteristics.size}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Exercise Needs: {characteristics.exerciseNeeds}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Nature: {characteristics.nature}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Animal Aggression: {characteristics.animalAggression}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Temperament: {characteristics.temperament}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Energy Level: {characteristics.energyLevel}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Training Needs: {characteristics.trainingNeeds}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center text-white-500">
              No Dog Characteristics Found
            </h2>
          )}
        </div>
      </div>
    </div>




  );
};

export default DogCharacteristics;
