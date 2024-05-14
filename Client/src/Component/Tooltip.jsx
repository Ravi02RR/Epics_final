// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Tooltip = () => {
    return (
       
            <div className="tooltip   tooltip-bottom" data-tip="Join Whatsaap">
                <a href="http://wa.me/+14155238886?text=join%20sing-grass" target='__blank'><button className="btn-ghost text-4xl text-green-500"><FaWhatsapp></FaWhatsapp></button></a>
                
            </div>
        
    )
}

export default Tooltip