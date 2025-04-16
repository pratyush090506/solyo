import React from 'react'
import './Navbar.css'
function Footer(){
    return(
        <footer className='footer'>{`\u00A9 `}{new Date().getFullYear()}{` Waya All rights reserved` }</footer>
    )
}
export default Footer