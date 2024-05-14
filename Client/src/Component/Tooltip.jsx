// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Tooltip = () => {
    return (
        <div className='  p-10 sticky bottom-0 left'>
            <div className="tooltip" data-tip="Join Whatsaap">
                <a href="http://wa.me/+14155238886?text=join%20sing-grass"><button className="btn-ghost text-4xl text-green-500"><FaWhatsapp></FaWhatsapp></button></a>
                
            </div>
        </div>
    )
}

export default Tooltip