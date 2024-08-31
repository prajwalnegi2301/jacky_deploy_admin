import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaUpload, FaBox, FaListAlt, FaCheckCircle } from 'react-icons/fa';
import { useContext } from "react";
import { Context } from "../main";

const Products = () => {
  const [avatar, setAvatar] = useState("");
  const [productType, setProductType] = useState("");
  const [desc, setDesc] = useState("");
  const [productName, setProductName] = useState("");
  const [isFoodItem, setIsFoodItem] = useState("");
  const [productId, setProductId] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [products, setProducts] = useState([]);
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/getProducts",
        { withCredentials: true }
      );
      setProducts(data.products);
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

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("productId", productId);
    formData.append("productType", productType);
    formData.append("productName", productName);
    formData.append("isFoodItem", isFoodItem);
    formData.append("desc", desc);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/postProduct",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductType("");
      setProductName("");
      setProductAvatar("");
      setProductId("");
      setAvatarPreview("");
      setDesc("");
      setIsFoodItem("");

      toast.success(data.message);
      getProducts(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!isAdminAuthenticated){
      navigateTo("/login");
    }
    getProducts();
  }, []);

  return (
 

    <div className="bg-slate-200 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6">Post Product</h3>
        <form onSubmit={addProduct} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="font-medium">Product MAIN IMAGE</label>
            <img
              src={avatarPreview ? `${avatarPreview}` : "/imgPL.webp"}
              alt="mainImg"
              className="w-32 h-32 object-cover rounded"
            />
            <input
              type="file"
              onChange={(e) => handleImagePreview(e, setAvatarPreview, setAvatar)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaBox className="text-white-500" />
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaListAlt className="text-white-500" />
              <input
                type="text"
                placeholder="Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FaListAlt className="text-white-500" />
              <input
                type="text"
                placeholder="Product Id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <textarea
              rows="4"
              placeholder="Product Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-white-500" />
            <select
              id="isFoodItem"
              name="isFoodItem"
              className="w-full p-2 border border-gray-300 rounded"
              value={isFoodItem}
              onChange={(e) => setIsFoodItem(e.target.value)}
            >
              <option value="">isFoodItem</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Add Product details
          </motion.button>
        </form>
      </div>

      <section className="mt-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.avatar && (
                <img
                  src={product.avatar.url}
                  alt="Product Image"
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h4 className="text-xl font-bold mt-2">{product.productName}</h4>
              <p className="text-white-700">{product.desc}</p>
              <p className="text-white-700">Type: {product.productType}</p>
              <p className="text-white-700">Food Item: {product.isFoodItem}</p>
              <p className="text-white-700">Food Item: {product.productId}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-white-500">No products..</p>
        )}
      </section>
    </div>
  );

};

export default Products;
