"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditRoleMobile = () => {

    const [selectedRole, setSelectedRole] = useState("");
    const [mobile, setMobile] = useState("");

    // roles collection
    const roles =[
        {
            name: "User",
            icon: "👤",
            description: "I am a customer",
            value: "user"
        },
        {
            name: "Rider",
            icon: "🛵",
            description: "I am a delivery person",
            value: "rider"
        },
        {
            name: "Admin",
            icon: "👑",
            description: "I am an administrator",
            value: "admin"
        }
    ];

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-green-700 text-center"
            >
                Select Your Role
            </motion.h1>
            <p className="text-center text-gray-600 my-2">We need to know your role to serve you better</p>

            {/* roles container cards */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                {roles.map((item) => (
                    <motion.div
                        onClick={() => setSelectedRole(item.value)}
                        key={item.value}
                        whileTap={{scale:0.95}}
                        initial={{opacity:0, scale:0.9}}
                        animate={{opacity:1, scale:1}}
                        transition={{duration:0.1, delay:0.5}}
                        className={`flex flex-col justify-center items-center border-2 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                        selectedRole === item.value 
                        ? "border-green-600 bg-green-100 shadow-lg scale-105" 
                        : "border-gray-300 hover:border-green-300 hover:shadow-md"}`
                        }
                    >
                        <p>{item.icon}</p>
                        <h2 className='text-green-700 font-bold'>{item.name}</h2>
                        <p className='text-gray-600'>{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* mobile number input */}
            <motion.div
                initial={{opacity:0, scale:0.9}}
                animate={{opacity:1, scale:1}}
                transition={{duration:0.1, delay:0.5}}
                className='flex flex-col items-center mt-6'
            >
                <label htmlFor="mobile" className='text-gray-700 font-medium mb-2'>Enter Your Mobile Number</label>
                <input 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    type="tel" 
                    id="mobile" 
                    placeholder="Enter your mobile number" 
                    className='border-2 border-gray-300 rounded-xl px-4 py-2 w-64 md:w-80 focus:outline-none focus:border-green-600 text-gray-800'
                />
            </motion.div>

            {/* continue button */}
            <motion.button
                whileTap={{scale:0.95}}
                initial={{opacity:0, scale:0.9}}
                animate={{opacity:1, scale:1}}
                transition={{duration:0.1, delay:0.5}}
                className='bg-green-600 text-white px-4 py-2 rounded-xl mt-6 cursor-pointer hover:bg-green-700 transition-all duration-300'
            >
                Continue
            </motion.button>
        </div>
    );
};

export default EditRoleMobile;