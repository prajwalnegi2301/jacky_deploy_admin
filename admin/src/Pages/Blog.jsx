import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaFileImage, FaPen, FaUser, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../main";

const Blog = () => {
  const [mainImage, setMainImage] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [description1, setDescription1] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [description2, setDescription2] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [description3, setDescription3] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [createBlog, setCreateBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const{ isAdminAuthenticated,setIsAdminAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/dogBlog/getAllBlogs",
        { withCredentials: true }
      );
      setBlogs(data.blogs);
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

  const addBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorName", authorName);
    formData.append("mainImage", mainImage);

    if (description1.length > 0) {
      formData.append("description1", description1);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }

    if (description2.length > 0) {
      formData.append("description2", description2);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }

    if (description3.length > 0) {
      formData.append("description3", description3);
    }
    if (paraThreeImage) {
      formData.append("paraThreeImage", paraThreeImage);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/dogBlog/createBlog",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      setAuthorName("");

      setMainImage("");
      setMainImagePreview("");

      setDescription1("");
      setParaOneImage("");
      setParaOneImagePreview("");

      setDescription2("");
      setParaTwoImage("");
      setParaTwoImagePreview("");

      setDescription3("");
      setParaThreeImage("");
      setParaThreeImagePreview("");
      toast.success(data.message);
      getAllBlogs(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getAllBlogs();
  }, [isAdminAuthenticated]);

  const showCreateBlog = (e) => {
    e.preventDefault();
    setCreateBlog(!createBlog);
  };

  return (
    // <div className="bg-purple-200">
    //   <button onClick={showCreateBlog}>Create Blog</button>

    //   {createBlog && (
    //     <div>
    //       <h3>CREATE BLOG</h3>
    //       <form onSubmit={addBlog}>
    //         <input
    //           type="text"
    //           placeholder="BLOG MAIN TITLE"
    //           value={title}
    //           onChange={(e) => setTitle(e.target.value)}
    //         />
    //         <div style={{ display: "flex", flexDirection: "column" }}>
    //           <label>BLOG MAIN IMAGE</label>
    //           <img
    //             src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
    //             alt="mainImg"
    //             className="mainImg"
    //           />
    //           <input
    //             type="file"
    //             onChange={(e) => handleImagePreview(e, setMainImagePreview, setMainImage)}
    //             style={{ border: "none" }}
    //           />
    //         </div>

    //         <div className="sub-para">
    //           <img
    //             src={paraOneImagePreview ? `${paraOneImagePreview}` : "/imgPL.webp"}
    //             alt="subParaOneImg"
    //           />
    //           <input
    //             type="file"
    //             onChange={(e) => handleImagePreview(e, setParaOneImagePreview, setParaOneImage)}
    //             style={{ border: "none" }}
    //           />
    //           <textarea
    //             rows="10"
    //             placeholder="Blog First Sub Paragraph Comes Here..."
    //             value={description1}
    //             onChange={(e) => setDescription1(e.target.value)}
    //           />
    //         </div>
    //         <div className="sub-para">
    //           <img
    //             src={paraTwoImagePreview ? `${paraTwoImagePreview}` : "/imgPL.webp"}
    //             alt="subParaTwoImg"
    //           />
    //           <input
    //             type="file"
    //             onChange={(e) => handleImagePreview(e, setParaTwoImagePreview, setParaTwoImage)}
    //             style={{ border: "none" }}
    //           />
    //           <textarea
    //             rows="10"
    //             placeholder="Blog Second Sub Paragraph Comes Here..."
    //             value={description2}
    //             onChange={(e) => setDescription2(e.target.value)}
    //           />
    //         </div>
    //         <div className="sub-para">
    //           <img
    //             src={paraThreeImagePreview ? `${paraThreeImagePreview}` : "/imgPL.webp"}
    //             alt="subParaThreeImg"
    //           />
    //           <input
    //             type="file"
    //             onChange={(e) => handleImagePreview(e, setParaThreeImagePreview, setParaThreeImage)}
    //             style={{ border: "none" }}
    //           />
    //           <textarea
    //             rows="10"
    //             placeholder="Blog Third Sub Paragraph Comes Here..."
    //             value={description3}
    //             onChange={(e) => setDescription3(e.target.value)}
    //           />
    //         </div>
    //         <input
    //           type="text"
    //           placeholder="Author Name"
    //           value={authorName}
    //           onChange={(e) => setAuthorName(e.target.value)}
    //         />

    //         <button type="submit">POST BLOG</button>
    //       </form>
    //     </div>
    //   )}

    //   <section>
    //     {blogs && blogs.length > 0
    //       ? blogs.map((element) => (
    //           <div key={element._id}>
    //             {element.mainImage && (
    //               <img src={element.mainImage.url} alt="blogImg" />
    //             )}
    //             <h4>{element.title}</h4>
    //             {element.paraOneImage && (
    //               <img src={element.paraOneImage.url} alt="blogImg" />
    //             )}
    //             <h4>{element.description1}</h4>
    //             {element.paraTwoImage && (
    //               <img src={element.paraTwoImage.url} alt="blogImg" />
    //             )}
    //             <h4>{element.description2}</h4>
    //             {element.paraThreeImage && (
    //               <img src={element.paraThreeImage.url} alt="blogImg" />
    //             )}
    //             <h4>{element.description3}</h4>
    //             <h4>{element.authorName}</h4>
    //           </div>
    //         ))
    //       : "No Blogs.."}
    //   </section>
    // </div>







    <div className="bg-slate-200 p-6">
     <button
        onClick={showCreateBlog}
        className="bg-purple-600 text-white py-2 px-4 rounded-full flex items-center hover:bg-purple-700"
      >
        {createBlog ? (
          <>
            <FaTimes className="mr-2" />
            Close Blog
          </>
        ) : (
          <>
            <FaPlus className="mr-2" />
            Create Blog
          </>
        )}
      </button>

      {createBlog && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-2xl font-bold mb-4">CREATE BLOG</h3>
          <form onSubmit={addBlog} className="space-y-6">
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex flex-col space-y-2">
              <label className="flex items-center text-lg">
                <FaFileImage className="mr-2" />
                BLOG MAIN IMAGE
              </label>
              <img
                src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
                alt="mainImg"
                className="w-full h-48 object-cover rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => handleImagePreview(e, setMainImagePreview, setMainImage)}
                className="border-none"
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <img
                  src={paraOneImagePreview ? `${paraOneImagePreview}` : "/imgPL.webp"}
                  alt="subParaOneImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaOneImagePreview, setParaOneImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog First Sub Paragraph Comes Here..."
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <img
                  src={paraTwoImagePreview ? `${paraTwoImagePreview}` : "/imgPL.webp"}
                  alt="subParaTwoImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaTwoImagePreview, setParaTwoImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog Second Sub Paragraph Comes Here..."
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <img
                  src={paraThreeImagePreview ? `${paraThreeImagePreview}` : "/imgPL.webp"}
                  alt="subParaThreeImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaThreeImagePreview, setParaThreeImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog Third Sub Paragraph Comes Here..."
                  value={description3}
                  onChange={(e) => setDescription3(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-700"
            >
              <FaPaperPlane className="mr-2" />
              POST BLOG
            </button>
          </form>
        </div>
      )}

      <section className="mt-8 space-y-6">
        {blogs && blogs.length > 0
          ? blogs.map((element) => (
              <div key={element._id} className="bg-white p-6 rounded-lg shadow-md">
                {element.mainImage && (
                  <img src={element.mainImage.url} alt="blogImg" className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h4 className="text-xl font-bold mb-2">{element.title}</h4>
                {element.paraOneImage && (
                  <img src={element.paraOneImage.url} alt="blogImg" className="w-full h-48 object-cover rounded-lg mb-2" />
                )}
                <h4 className="mb-4">{element.description1}</h4>
                {element.paraTwoImage && (
                  <img src={element.paraTwoImage.url} alt="blogImg" className="w-full h-48 object-cover rounded-lg mb-2" />
                )}
                <h4 className="mb-4">{element.description2}</h4>
                {element.paraThreeImage && (
                  <img src={element.paraThreeImage.url} alt="blogImg" className="w-full h-48 object-cover rounded-lg mb-2" />
                )}
                <h4 className="mb-4">{element.description3}</h4>
                <h4 className="text-right text-white-600">{element.authorName}</h4>
              </div>
            ))
          : <p className="text-center text-white-600">No Blogs..</p>}
      </section>
    </div>
  );
};

export default Blog;
