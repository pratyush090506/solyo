import React from 'react'
import { FiMapPin, FiUser,FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import './Navbar.css'
import Logo from '../assets/solyo.svg'
const Navbar: React.FC = () =>{
    return (
        
        <nav className='navy'>
            <div className="text-2xl font-bold text-indigo-600">
                <Link to="/"><img src={Logo } style={{height: '3.5rem'}} alt="logo"/></Link>
            </div>

            <div className='tabs'>
                <Link to = '/capture' className='hover:text-indigo-600 transition'>Capture</Link>
                <Link to = '/plan' className="hover:text-indigo-600 transition">Plan Itinerary</Link>
                <Link to = '/highlights' className='hover:text-indigo-600 transition'>Highlights</Link>
            </div>

            <div className="text-gray-600 text-2xl cursor-pointer hover:text-indigo-800">
                <Link to='/profile'>
                    <FaUserCircle size={30}/>

                </Link>
            </div>
        </nav>
    )
}
export default Navbar