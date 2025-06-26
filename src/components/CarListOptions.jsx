import React from 'react'
import { useState } from 'react';
import CarListItem from './CarListItem';
import { CarListData } from '../utils/CarListData';

function CarListOptions({distance}) {
  const [activeIndex,setActiveIndex]=useState();
  return (
    <div className='mt-5 p-5 overflow-auto h-[430px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item,index)=>(
       <div
        className={`cursor-pointer p-2 px-4 rounded-md border-black
           ${activeIndex === index ? 'border-[3px]' : null}`}
      onClick={() => setActiveIndex(index)}
      key={item.id}>
      <CarListItem car={item} distance={distance}/>
      </div>

      ))}
    </div>
  )
}

export default CarListOptions