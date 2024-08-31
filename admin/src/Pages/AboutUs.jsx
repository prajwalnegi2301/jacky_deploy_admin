import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClipboardCheck, FaRoute, FaRegLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div>

      <div className="bg-slate-100 min-h-screen">
        {/* Section 1 */}
    
        <div className="flex flex-col md:flex-row items-center justify-center py-12">
          <div className="bg-white hover:bg-slate-50 rounded-lg shadow-md m-4 w-full md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">
              Who I <span className="text-purple-500 hover:text-4xl">Am?</span>

            </h1>
            <p className="mb-4  text-white-700">
              Hello, I am <strong>Sachin Singh </strong>. I would like to
              welcome you all to our beautiful Bro Hostel Pg. I have hosted 500+
              tenants till now and we have received amazing reviews. I know
              staying far from home hurts, but I will make sure that this place
              makes you feel like a home away from home. I am known to be an
              amazing host and a friend. I like to keep myself updated with all
              the digital trends in the market, and would welcome more. You can
              find me talking to tenants all the time, either helping them with
              issues or talking about life. I do understand "do not disturb"
              very well until you pay rent on time. Join us for a fun and happy
              renting experience.
            </p>
          </div>
          <div className="m-4 w-full md:w-1/2">
            <motion.div className="" whileHover={{ scale: 1.05 }}>
              <img
                src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA="
                alt="apartment"
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-center py-12">
          <div className="bg-white hover:bg-slate-50 rounded-lg shadow-md m-4 w-full md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">
              Why only <span className="text-purple-500 hover:text-4xl">BRO PG?</span>
            </h1>
            <p className="mb-4 text-white-700">
              We started this PG for you to feel like home as you are far away
              from it. Our journey began with the realization that traditional
              PG accommodations just weren't cutting it. They were cramped,
              impersonal, and lacked the warmth and comfort of home. We
              understood that living away from home is challenging, and having a
              place that feels like a second home can make all the difference.
              That's why we created a PG designed to provide you with not just a
              place to stay, but a place where you can truly belong. Our PG is a
              community where you can connect with others, find support, and
              feel at ease. We’ve thought of every detail to ensure you have
              everything you need to live comfortably and happily, even when
              you're miles away from home.
            </p>
          </div>
          <div className="m-4 w-full md:w-1/2">
            <motion.div className="" whileHover={{ scale: 1.05 }}>
              <img
                src="https://www.shutterstock.com/image-photo/interior-small-apartment-living-room-600nw-2154108011.jpg"
                alt="apartment"
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center justify-center py-12">
          <div className="bg-white hover:bg-slate-50 rounded-lg shadow-md m-4 w-full md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">
              The Inspiration behind it?{" "}
              <span className="text-purple-500 hover:text-4xl">You</span>
            </h1>
            <p className="mb-4 text-white-700">
              Imagine a place to call your own—a sanctuary where you can study,
              relax, and thrive. Staying here offers students a unique
              opportunity to invest in their future while enjoying the comforts
              of home away from home. At <strong>BRO PG</strong>, we understand
              the importance of finding the perfect home base during your
              student years. Our range of flats combines modern amenities,
              convenient locations near campuses, and attractive financing
              options tailored to students and young professionals. We are
              committed to helping you find a flat that not only meets your
              expectations but exceeds them.
            </p>
          </div>
          <div className="m-4 w-full md:w-1/2">
            <motion.div className="" whileHover={{ scale: 1.05 }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU03KurF3QzYwg3EBVv3GPjFiOMDCurqP5OuI3LGW6oPyBczpJM8XZJ6fVCrvxCWk_t_Y&usqp=CAU"
                alt="apartment"
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
