'use client'
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { LuBike, LuShoppingBasket } from 'react-icons/lu';

const Welcome = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full min-h-screen text-center p-6'>

            <motion.h1 
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className='flex items-center gap-3 text-4xl md:text-5xl font-extrabold text-green-700'> <LuShoppingBasket className='text-green-600' /> Welcome to Grocify
            </motion.h1>

            <motion.p
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.3}}
            className='text-gray-600 mt-4 text-lg md:text-xl max-w-lg'>Your one stop shop for all your grocery needs and fresh products delivered to your doorstep.
            </motion.p>

            <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, delay: 0.6}}
            className='flex items-center gap-5 text-6xl'>
                <LuShoppingBasket className='text-green-600 drop-shadow-lg' /> 
                <motion.div 
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.6, delay: 0.9}}><LuBike className='text-orange-500 drop-shadow-lg' /></motion.div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover="hover"
                transition={{ duration: 0.3 }}
                className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg transition-colors duration-300 ease-in-out'
            >
                Get Started
                <motion.span
                    variants={{
                        hover: { x: 5 }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                    <FaArrowRight />
                </motion.span>
            </motion.button>
        </div>
    );
};

export default Welcome;