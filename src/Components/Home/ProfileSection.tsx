"use client";
import { User } from "next-auth";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { LuPackage } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";

const ProfileSection = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    // set mounted to true on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // close dropdown when clicking outside of it
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
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setShowLogoutModal(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-red-50 w-full cursor-pointer"
                        >
                            <IoIosLogOut className="text-red-700 w-6 h-6" />
                            <p className="text-red-700 font-medium">Logout</p>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Logout Confirmation Modal */}
            {mounted && createPortal(
                    <AnimatePresence>
                        {showLogoutModal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                            >
                                <motion.div
                                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm"
                                >
                                    {/* Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                                            <IoIosLogOut className="text-red-600 w-7 h-7" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h2 className="text-gray-800 text-lg font-semibold text-center">Logout</h2>
                                    <p className="text-gray-500 text-sm text-center mt-1">Are you sure you want to logout?</p>

                                    {/* Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setShowLogoutModal(false)}
                                            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/login" })}
                                            className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer"
                                        >
                                            Yes, Logout
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
};

export default ProfileSection;
