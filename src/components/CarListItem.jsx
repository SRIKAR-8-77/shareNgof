import React from 'react'
import { CarListData } from '../utils/CarlistData.jsx'
import { FaUserAlt } from "react-icons/fa";
function CarListItem({car,distance}) {
  return (
    <div  className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
        <img src={car.image} width={100} height={100} alt={car.name} />

        <div>
            <h2 className='font-semibold text-[18px] 
            flex gap-3 items-center'>
                {car.name}
                
                <span className='flex gap-2 font-normal 
                text-[17px] items-center'>
                  <FaUserAlt />{car.seat}
                </span>
                </h2>
                <p>
                    {car.desc}
                </p>
            
        </div>
        </div>
        <h2 className='font-bold text-[18px]'>
            ${(car.amount*distance).toFixed(2)}
        </h2>
    </div>
  )
}

export default CarListItem