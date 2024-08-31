import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../main";

const AppointmentInstructorAtHome = () => {
  const [docAvatar, setdocAvatar] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogWeight, setDogWeight] = useState("");
  const [animalAggression, setAnimalAggression] = useState("");
  const [dogNature, setDogNature] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [docAvatarPreview, setdocAvatarPreview] = useState("");

  const [appointments, setAppointments] = useState([]);

  const {isAdminAuthenticated,setIsAdminAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/instructorAppointmentAtHome/postAppointment",
        { withCredentials: true }
      );
      setAppointments(data.appointments);
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

  const addAppointment = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("docAvatar", docAvatar);
    formData.append("dogName", dogName);
    formData.append("dogBreed", dogBreed);
    formData.append("dogSize", dogSize);
    formData.append("dogAge", dogAge);
    formData.append("date", date);
    formData.append("duration", duration);
    formData.append("dogNature", dogNature);
    formData.append("dogWeight", dogWeight);
    formData.append("animalAggression", animalAggression);
    formData.append("dogGender", dogGender);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/instructorAppointmentAtHome/createService/centerVisit",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setdocAvatar("");
      setAnimalAggression("");
      setDogAge("");
      setDogNature("");
      setDogBreed("");
      setDate("");
      setDuration("");
      setDogWeight("");
      setDogName("");
      setDogGender("");

      toast.success(data.message);
      getAllAppointments(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllAppointments();
  }, []);

  return (
    <div className="bg-slate-200">
      <div>
        <h3>Post Appointments At Center</h3>
        <form onSubmit={addAppointment}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Dog Main image</label>
            <img
              src={docAvatarPreview ? `${docAvatarPreview}` : "/imgPL.webp"}
              alt="mainImg"
              className="mainImg"
            />
            <input
              type="file"
              onChange={(e) =>
                handleImagePreview(e, setdocAvatarPreview, setdocAvatar)
              }
              style={{ border: "none" }}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Dog Name"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dog Stay Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dog Breed"
              value={dogBreed}
              onChange={(e) => setDogBreed(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dog Age"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="dog Weight"
              value={dogWeight}
              onChange={(e) => setDogWeight(e.target.value)}
            />

            <div>
              <select
                id="dogGender"
                name="dogGender"
                className="w-full p-2 text-white-700 leading-tight focus:outline-none"
                value={dogGender}
                onChange={(e) => setDogGender(e.target.value)}
              >
                <option value="">Select dogGender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <select
                id="animalAggression"
                name="animalAggression"
                className="w-full p-2 text-white-700 leading-tight focus:outline-none"
                value={animalAggression}
                onChange={(e) => setAnimalAggression(e.target.value)}
              >
                <option value="">Select AnimalAggression</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <select
                id="dogNature"
                name="dogNature"
                className="w-full p-2 text-white-700 leading-tight focus:outline-none"
                value={dogNature}
                onChange={(e) => setDogNature(e.target.value)}
              >
                <option value="">Select DogNature</option>
                <option value="Friendly">Friendly</option>
                <option value="NotFriendly">NotFriendly</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="dog Size"
              value={dogSize}
              onChange={(e) => setDogSize(e.target.value)}
            />
          </div>

          <button type="submit">submit appointment</button>
        </form>
      </div>

      {/* to admin */}

      {/* <section>
        {appointments && appointments.length > 0
          ? appointments.map((appointment) => (
              <div key={appointment._id}>
                {appointment.docAvatar && <img src={appointment.docAvatar.url} alt="blogImg" />}
             
                <h4>{dog.dogAge}</h4>
                <h4>{dog.dogGender}</h4>
                <h4>{dog.dogStayDuration}</h4>
                <h4>{dog.date}</h4>
                <h4>{dog.dogBreed}</h4>
                <h4>{dog.dogName}</h4>
                <h4>{dog.dogWeight}</h4>
                <h4>{dog.dogSize}</h4>
                <h4>{dog.dogNature}</h4>
                <h4>{dog.animalAggression}</h4>
              </div>
            ))
          : "No appointments.."}
      </section> */}
    </div>
  );
};

export default AppointmentInstructorAtHome;
