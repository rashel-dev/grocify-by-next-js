"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditRoleMobile = () => {

    const [selectedRole, setSelectedRole] = useState("");

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
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                {roles.map((item) => (
                    <motion.div
                        onClick={() => setSelectedRole(item.value)}
                        key={item.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col justify-center items-center border-2 p-4 rounded-xl transition-all duration-300 cursor-pointer ${selectedRole === item.value ? "border-green-600 bg-green-100 shadow-lg" : "border-gray-300 hover:border-green-300 hover:shadow-md"}`}
                    >
                        <p>{item.icon}</p>
                        <h2 className='text-green-700 font-bold'>{item.name}</h2>
                        <p className='text-gray-600'>{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EditRoleMobile;