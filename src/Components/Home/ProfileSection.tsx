"use client";
import { User } from "next-auth";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { LuPackage } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

const ProfileSection = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-50" ref={dropDownRef}>
            {/* User Profile icon */}
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {user.image ? (
                    <Image src={user.image} alt={user.name || "User"} width={40} height={40} className="rounded-full" />
                ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                        <FaUser className="text-white w-5 h-5" />
                    </div>
                )}
            </div>

            {/* Dropdown menu */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg px-2 py-2 border border-gray-200 z-50 w-56"
                    >
                        {/* user info */}
                        <div className="flex items-center gap-2 px-2 py-2">
                            <div>
                                {user.image ? (
                                    <Image src={user.image} alt={user.name || "User"} width={40} height={40} className="rounded-full" />
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                                        <FaUser className="text-white w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <p className="text-gray-700 font-medium"> {user.name}</p>
                                <p className="text-gray-500 text-sm">{user.role}</p>
                            </div>
                        </div>

                        {/* hr line */}
                        <div className="border-t border-gray-200 my-2"></div>

                        {/* My Orders */}
                        <Link href={""} className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">
                            <LuPackage className="text-green-700 w-6 h-6" />
                            <p className="text-green-700 font-medium">My Orders</p>
                        </Link>

                        {/* logout button */}
                        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-red-50 w-full cursor-pointer">
                            <IoIosLogOut className="text-red-700 w-6 h-6" />
                            <p className="text-red-700 font-medium">Logout</p>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileSection;
