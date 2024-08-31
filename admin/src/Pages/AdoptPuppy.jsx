import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Context } from "../main";



const Puppy = () => {

  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);
  
  const [mainImage, setMainImage] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [oneImage, setOneImage] = useState("");
  const [description, setDescription] = useState("");
  const [twoImage, setTwoImage] = useState("");
  const [age, setAge] = useState("");
  const [threeImage, setThreeImage] = useState("");
  const [gender, setGender] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [oneImagePreview, setOneImagePreview] = useState("");
  const [twoImagePreview, setTwoImagePreview] = useState("");
  const [threeImagePreview, setThreeImagePreview] = useState("");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const [puppies, setPuppies] = useState([]);

  const navigateTo = useNavigate();

  const getAllPuppies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/puppyAdopt/getAllDetails",
        { withCredentials: true }
      );
      setPuppies(data.puppies);
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


  const addPuppy = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("breed", breed);
    formData.append("name", name);
    formData.append("mainImage", mainImage);
    formData.append("color", color);
    formData.append("weight", weight);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("purpose", purpose);

    if (description.length > 0) {
      formData.append("description", description);
    }
    if (threeImage) {
      formData.append("threeImage", threeImage);
    }
    if (twoImage) {
      formData.append("twoImage", twoImage);
    }
    if (oneImage) {
      formData.append("oneImage", oneImage);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/puppyAdopt/postDetails",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setBreed("");
      setName("");
      setColor("");
      setWeight("");


      setMainImage("");
      setMainImagePreview("");

      setDescription("");
      setOneImage("");
      setOneImagePreview("");

      setAge("");
      setTwoImage("");
      setTwoImagePreview("");

      setGender("");
      setThreeImage("");
      setThreeImagePreview("");
      toast.success(data.message);
      getAllPuppies(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllPuppies();
  }, []);

  return (
    <div className="bg-purple-200 py-12">


      {/* By admin */}

      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
        <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          Post Puppy Details
        </h3>
        <form onSubmit={addPuppy} className="space-y-4">
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <div className="flex flex-col items-center mb-4">
            <label className="font-medium mb-2">Puppy Photo</label>
            <img
              src={mainImagePreview ? mainImagePreview : "/imgPL.webp"}
              alt="Main Img"
              className="w-32 h-32 object-cover mb-2"
            />
            <label className="flex items-center gap-2 cursor-pointer">
      
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) =>
                  handleImagePreview(e, setMainImagePreview, setMainImage)
                }
                className="hidden"
              />
            </label>
          </div>
          <div className="space-y-2">
            <img
              src={oneImagePreview ? oneImagePreview : "/imgPL.webp"}
              alt="Image Preview 1"
              className="w-32 h-32 object-cover"
            />
            <label className="flex items-center gap-2 cursor-pointer">
           
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) =>
                  handleImagePreview(e, setOneImagePreview, setOneImage)
                }
                className="hidden"
              />
            </label>
            <textarea
              rows="4"
              placeholder="Description Paragraph Comes Here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <img
              src={twoImagePreview ? twoImagePreview : "/imgPL.webp"}
              alt="Image Preview 2"
              className="w-32 h-32 object-cover"
            />
            <label className="flex items-center gap-2 cursor-pointer">
          
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) =>
                  handleImagePreview(e, setTwoImagePreview, setTwoImage)
                }
                className="hidden"
              />
            </label>
            <textarea
              rows="4"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <img
              src={threeImagePreview ? threeImagePreview : "/imgPL.webp"}
              alt="Image Preview 3"
              className="w-32 h-32 object-cover"
            />
            <label className="flex items-center gap-2 cursor-pointer">
     
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) =>
                  handleImagePreview(e, setThreeImagePreview, setThreeImage)
                }
                className="hidden"
              />
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
          >
            Add Puppy Details
          </button>
        </form>
      </div>




      <section className="  m-16 rounded-xl">
        {puppies && puppies.length > 0 ? (
          puppies.map((puppy) => (
            <motion.div
              key={puppy._id}
              className="bg-white shadow-md rounded-lg overflow-hidden mb-8 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row">
                {puppy.mainImage && (
                  <img
                    src={puppy.mainImage.url}
                    alt={`${puppy.name}`}
                    className="w-full md:w-1/3 object-cover rounded-md"
                  />
                )}
                <div className="w-full md:w-2/3 p-4">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2 flex items-center">
                   
                    {puppy.name}
                  </h3>
                  <p className="text-purple-600 mb-2">{puppy.description}</p>
                  <div className="flex space-x-4">
                    {puppy.oneImage && (
                      <img
                        src={puppy.oneImage.url}
                        alt="Image One"
                        className="w-1/3 object-cover rounded-md"
                      />
                    )}
                    {puppy.twoImage && (
                      <img
                        src={puppy.twoImage.url}
                        alt="Image Two"
                        className="w-1/3 object-cover rounded-md"
                      />
                    )}
                    {puppy.threeImage && (
                      <img
                        src={puppy.threeImage.url}
                        alt="Image Three"
                        className="w-1/3 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-purple-600">
                      <span className="font-bold">Age:</span> {puppy.age}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-bold">Breed:</span> {puppy.breed}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-bold">Gender:</span> {puppy.gender}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-bold">Color:</span> {puppy.color}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-bold">Weight:</span> {puppy.weight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-purple-700 text-xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            No Puppies..
          </motion.p>
        )}
      </section>
    </div>

  );
};

export default Puppy;
