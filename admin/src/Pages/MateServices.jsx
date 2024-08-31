import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaDog, FaImage, FaPaw } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useContext } from "react";
import { Context } from "../main";


const MateServices = () => {
  const [dogImage, setDogImage] = useState("");
  const [dogColor, setDogColor] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogLocation, setDogLocation] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogWeight, setDogWeight] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogNature, setDogNature] = useState("");
  const [animalAggression, setAnimalAggression] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogImagePreview, setDogImagePreview] = useState("");

  const [dogMate, setDogMate] = useState([]);
  const{isAdminAuthenticated,setIsAdminAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const getMateDogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/dogMate/getAllDogs",
        { withCredentials: true }
      );
      setDogMate(data.dogMate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePreview = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      setFile(file);
    };
  };

  const addMateDog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dogLocation", dogLocation);
    formData.append("dogImage", dogImage);
    formData.append("dogColor", dogColor);
    formData.append("dogName", dogName);
    formData.append("dogBreed", dogBreed);
    formData.append("dogSize", dogSize);
    formData.append("dogAge", dogAge);
    formData.append("dogNature", dogNature);
    formData.append("dogWeight", dogWeight);
    formData.append("animalAggression", animalAggression);
    formData.append("dogGender", dogGender);
    formData.append("dogDescription", dogDescription);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/dogMate/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setDogColor("");
      setAnimalAggression("");
      setDogAge("");
      setDogNature("");
      setDogBreed("");
      setDogLocation("");
      setDogWeight("");
      setDogName("");
      setDogImage("");
      setDogImagePreview("");
      setDogDescription("");
      setDogGender("");

      toast.success(data.message);
      getMateDogs(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getMateDogs();
  }, [isAdminAuthenticated]);

  return (
    // <div className="bg-purple-200">
    //   <div>
    //     <h3>Post stray Dog details</h3>
    //     <form onSubmit={addMateDog}>
    //       <div style={{ display: "flex", flexDirection: "column" }}>
    //         <label>Dog MAIN IMAGE</label>
    //         <img
    //           src={dogImagePreview ? `${dogImagePreview}` : "/imgPL.webp"}
    //           alt="mainImg"
    //           className="mainImg"
    //         />
    //         <input
    //           type="file"
    //           onChange={(e) =>
    //             handleImagePreview(e, setDogImagePreview, setDogImage)
    //           }
    //           style={{ border: "none" }}
    //         />
    //       </div>

    //       <div>
    //         <input
    //           type="text"
    //           placeholder="Dog Name"
    //           value={dogName}
    //           onChange={(e) => setDogName(e.target.value)}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Dog Breed"
    //           value={dogBreed}
    //           onChange={(e) => setDogBreed(e.target.value)}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Dog Age"
    //           value={dogAge}
    //           onChange={(e) => setDogAge(e.target.value)}
    //         />

    //         <input
    //           type="text"
    //           placeholder="Adress"
    //           value={location}
    //           onChange={(e) => setDogLocation(e.target.value)}
    //         />
    //         <input
    //           type="text"
    //           placeholder="dog Colour"
    //           value={dogColor}
    //           onChange={(e) => setDogColor(e.target.value)}
    //         />
    //         <input
    //           type="text"
    //           placeholder="dog Weight"
    //           value={dogWeight}
    //           onChange={(e) => setDogWeight(e.target.value)}
    //         />

    //         <input
    //           type="text"
    //           placeholder="dog Size"
    //           value={dogSize}
    //           onChange={(e) => setDogSize(e.target.value)}
    //         />

    //         <textarea
    //           rows="10"
    //           placeholder="Blog First Sub Paragraph Comes Here..."
    //           value={dogDescription}
    //           onChange={(e) => setDogDescription(e.target.value)}
    //         />
    //       </div>

    //       <div>
    //         <select
    //           id="dogGender"
    //           name="dogGender"
    //           className="w-full p-2 text-white-700 leading-tight focus:outline-none"
    //           value={dogGender}
    //           onChange={(e) => setDogGender(e.target.value)}
    //         >
    //           <option value="">Select dogGender</option>
    //           <option value="Male">Male</option>
    //           <option value="Female">Female</option>
    //         </select>
    //       </div>

    //       <div>
    //         <select
    //           id="dogNature"
    //           name="dogNature"
    //           className="w-full p-2 text-white-700 leading-tight focus:outline-none"
    //           value={dogNature}
    //           onChange={(e) => setDogNature(e.target.value)}
    //         >
    //           <option value="">Select DogNature</option>
    //           <option value="Friendly">Friendly</option>
    //           <option value="NotFriendly">NotFriendly</option>
    //         </select>
    //       </div>

    //       <div>
    //         <select
    //           id="animalAggression"
    //           name="animalAggression"
    //           className="w-full p-2 text-white-700 leading-tight focus:outline-none"
    //           value={animalAggression}
    //           onChange={(e) => setAnimalAggression(e.target.value)}
    //         >
    //           <option value="">Select AnimalAggression</option>
    //           <option value="Yes">Yes</option>
    //           <option value="No">No</option>
    //         </select>
    //       </div>

    //       <button type="submit">Add dog details</button>
    //     </form>
    //   </div>

    //   <section>
    //     {dogMate && dogMate.length > 0
    //       ? dogMate.map((dog) => (
    //           <div key={dog._id}>
    //             {dog.dogImage && <img src={dog.dogImage.url} alt="blogImg" />}
    //             <h4>{dog.dogDescription}</h4>
    //             <h4>{dog.dogAge}</h4>
    //             <h4>{dog.dogGender}</h4>
    //             <h4>{dog.dogColor}</h4>
    //             <h4>{dog.dogLocation}</h4>
    //             <h4>{dog.dogBreed}</h4>
    //             <h4>{dog.dogName}</h4>
    //             <h4>{dog.dogWeight}</h4>
    //             <h4>{dog.dogSize}</h4>
    //             <h4>{dog.dogNature}</h4>
    //             <h4>{dog.animalAggression}</h4>
    //           </div>
    //         ))
    //       : "No Dogs.."}
    //   </section>
    // </div>




    <div className="bg-slate-200 p-8 min-h-screen flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl"
    >
      <h3 className="text-2xl font-bold text-purple-600 mb-6 text-center">
        Post Dog Details
      </h3>
      <form onSubmit={addMateDog} className="space-y-4">
        <div className="flex flex-col items-center">
    
          <motion.img
            src={dogImagePreview ? `${dogImagePreview}` : "/imgPL.webp"}
            alt="mainImg"
            className="mainImg w-32 h-32 rounded-full bg-purple-200 text-white object-cover mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <label className="flex items-center cursor-pointer bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            <HiOutlinePhotograph className="mr-2" />
            Upload Image
            <input
              type="file"
              onChange={(e) =>
                handleImagePreview(e, setDogImagePreview, setDogImage)
              }
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Dog Name"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Dog Breed"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Dog Age"
            value={dogAge}
            onChange={(e) => setDogAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Address"
            value={dogLocation}
            onChange={(e) => setDogLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Dog Colour"
            value={dogColor}
            onChange={(e) => setDogColor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Dog Weight"
            value={dogWeight}
            onChange={(e) => setDogWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Dog Size"
            value={dogSize}
            onChange={(e) => setDogSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Write Dog Description here..."
          value={dogDescription}
          onChange={(e) => setDogDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            id="dogGender"
            name="dogGender"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={dogGender}
            onChange={(e) => setDogGender(e.target.value)}
          >
            <option value="">Select Dog Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            id="dogNature"
            name="dogNature"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={dogNature}
            onChange={(e) => setDogNature(e.target.value)}
          >
            <option value="">Select Dog Nature</option>
            <option value="Friendly">Friendly</option>
            <option value="NotFriendly">Not Friendly</option>
          </select>

          <select
            id="animalAggression"
            name="animalAggression"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={animalAggression}
            onChange={(e) => setAnimalAggression(e.target.value)}
          >
            <option value="">Select Animal Aggression</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
        >
          <FaPaw className="mr-2" />
          Add Dog Details
        </button>
      </form>
    </motion.div>

    <motion.section
      className="mt-10 w-full max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {dogMate && dogMate.length > 0 ? (
        dogMate.map((dog) => (
          <motion.div
            key={dog._id}
            className="bg-white p-4 shadow-md rounded-lg mb-4"
            whileHover={{ scale: 1.02 }}
          >
            {dog.dogImage && (
              <img
                src={dog.dogImage.url}
                alt="dog"
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h4 className="text-xl font-bold mt-2">{dog.dogName}</h4>
            <p className="text-white-600">{dog.dogDescription}</p>
            <p className="text-white-600">Age: {dog.dogAge}</p>
            <p className="text-white-600">Gender: {dog.dogGender}</p>
            <p className="text-white-600">Color: {dog.dogColor}</p>
            <p className="text-white-600">Location: {dog.dogLocation}</p>
            <p className="text-white-600">Breed: {dog.dogBreed}</p>
            <p className="text-white-600">Weight: {dog.dogWeight}</p>
            <p className="text-white-600">Size: {dog.dogSize}</p>
            <p className="text-white-600">Nature: {dog.dogNature}</p>
            <p className="text-white-600">Animal Aggression: {dog.animalAggression}</p>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-white-500">No Dogs Found</p>
      )}
    </motion.section>
  </div>
  );
};

export default MateServices;
