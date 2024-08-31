import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPaw } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../main";

const AdoptTrainedDog = () => {
  const [mainImage, setMainImage] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [oneImage, setOneImage] = useState("");
  const [description, setDescription] = useState("");
  const [twoImage, setTwoImage] = useState("");
  const [age, setAge] = useState("");
  const [purpose, setPurpose] = useState("");
  const [threeImage, setThreeImage] = useState("");
  const [gender, setGender] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [oneImagePreview, setOneImagePreview] = useState("");
  const [twoImagePreview, setTwoImagePreview] = useState("");
  const [threeImagePreview, setThreeImagePreview] = useState("");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");

  const [trainedDog, setTrainedDog] = useState([]);

  const{isAdminAuthenticated, setIsAdminAuthenticated} = useContext(Context)

  const navigateTo = useNavigate();

  const getAllTrainedDogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/wantATrainedDog/getAllDogs",
        { withCredentials: true }
      );
      setTrainedDog(data.trainedDog);
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

  const addTrainedDog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("breed", breed);
    formData.append("name", name);
    formData.append("mainImage", mainImage);
    formData.append("color", color);
    formData.append("purpose", purpose);
    formData.append("weight", weight);
    formData.append("age", age);
    formData.append("gender", gender);

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
        "http://localhost:3000/api/v1/wantATrainedDog/postDetails",
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
      setPurpose("");

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
      getAllTrainedDogs(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllTrainedDogs();
  }, []);

  return (
    <div className="bg-purple-200 p-8">
      <div>
        <h3 className="text-3xl text-purple-700 mb-4">Post Trained Dog Details</h3>
        <form onSubmit={addTrainedDog} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Breed:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                placeholder="Enter breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Main Image:</label>
              <div className="relative">
                <img
                  src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
                  alt="mainImg"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setMainImagePreview, setMainImage)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Sub-Para Image One:</label>
              <div className="relative">
                <img
                  src={oneImagePreview ? `${oneImagePreview}` : "/imgPL.webp"}
                  alt="subParaOneImg"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setOneImagePreview, setOneImage)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Sub-Para Image Two:</label>
              <div className="relative">
                <img
                  src={twoImagePreview ? `${twoImagePreview}` : "/imgPL.webp"}
                  alt="subParaTwoImg"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setTwoImagePreview, setTwoImage)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Sub-Para Image Three:</label>
              <div className="relative">
                <img
                  src={threeImagePreview ? `${threeImagePreview}` : "/imgPL.webp"}
                  alt="subParaThreeImg"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setThreeImagePreview, setThreeImage)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Age:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Purpose:</label>
              <select
                id="purpose"
                name="purpose"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="">Select Purpose</option>
                <option value="GuardingFarmHouse">GuardingFarmHouse</option>
                <option value="ProtectionOfKids">ProtectionOfKids</option>
                <option value="ArmyConfedential">ArmyConfedential</option>
                <option value="PoliceConfedential">PoliceConfedential</option>
                <option value="GuardingGrandParents">GuardingGrandParents</option>
                <option value="ForGuardingSheeps">ForGuardingSheeps</option>
                <option value="PersonalProtection">PersonalProtection</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Color:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full px-2">
            <label className="block mb-1">Weight:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
            Add Dog Details
          </button>
        </form>
      </div>

      <section className="bg-slate-100 rounded-xl my-10 shadow-xl">
        {trainedDog && trainedDog.length > 0 ? (
          trainedDog.map((dog) => (
            <div key={dog._id} className="bg-white shadow-md rounded-lg overflow-hidden mb-8 p-4">
              <div className="flex flex-col md:flex-row">

                <div className="w-full md:w-2/3 md:pl-4">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2 flex items-center">
                    <FaPaw className="mr-2" />
                    {dog.name}
                  </h3>
                  <p className="text-purple-600 mb-4">{dog.description}</p>

                  <div className="flex space-x-4 mb-4">

                    {dog.mainImage && (
                      <img
                        src={dog.mainImage.url}
                        alt={dog.name}
                        className="w-full md:w-1/3 h-20 md:h-auto object-cover rounded-md"
                      />
                    )}

                    {dog.oneImage && (
                      <img
                        src={dog.oneImage.url}
                        alt="subParaOneImg"
                        className="w-full md:w-1/3 h-20 md:h-auto object-cover rounded-md"
                      />
                    )}
                    {dog.twoImage && (
                      <img
                        src={dog.twoImage.url}
                        alt="subParaTwoImg"
                        className="w-full md:w-1/3 h-20 md:h-auto object-cover rounded-md"
                      />
                    )}
                    {dog.threeImage && (
                      <img
                        src={dog.threeImage.url}
                        alt="subParaThreeImg"
                        className="w-full md:w-1/3 h-20 md:h-auto object-cover rounded-md"
                      />
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-purple-600"><span className="font-bold">Age:</span> {dog.age}</p>
                    <p className="text-purple-600"><span className="font-bold">Breed:</span> {dog.breed}</p>
                    <p className="text-purple-600"><span className="font-bold">Gender:</span> {dog.gender}</p>
                    <p className="text-purple-600"><span className="font-bold">Color:</span> {dog.color}</p>
                    <p className="text-purple-600"><span className="font-bold">Weight:</span> {dog.weight}</p>
                    <p className="text-purple-600"><span className="font-bold">Purpose:</span> {dog.purpose}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-purple-700 text-xl font-bold">No Trained Dogs..</p>
        )}
      </section>

    </div>
  );
};

export default AdoptTrainedDog;
