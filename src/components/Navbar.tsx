import React from 'react'
import { FiMapPin, FiUser,FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Navbar: React.FC = () =>{
    return (
        <motion.nav
            className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 80 }}>

            <div className="text-xl font-bold text-blue-600">Waya</div>
            <div className="flex gap-4 items-center text-gray-700 text-lg">
                <FiMapPin className="cursor-pointer hover:text-blue-500" />
                <FiUser className="cursor-pointer hover:text-blue-500" />
                <FiLogOut className="cursor-pointer hover:text-red-500" />
            </div>
        </motion.nav>
    )
}
export default Navbar