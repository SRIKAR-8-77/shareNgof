"use client"
import React, {useContext, useEffect} from 'react'
import LocationInput from './LocationInput'
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';
import CarListOptions from './CarListOptions';
import { useState } from 'react';


function SearchPanel() {
    const {source,setSource}=useContext(SourceContext);
    const {destination,setDestination}=useContext(DestinationContext);
    const [distance,setDistance]=useState();
    useEffect(()=>{
      if(source)
      {
        console.log(source);
      }
      if(destination){
        console.log("__",destination)
      }
    },[source,destination])

    const calculateDistance=()=>{
        const dist=google.maps.geometry.spherical.computeDistanceBetween(
           {
            lat:source.lat,lng:source.lng
           } ,
           {
            lat:destination.lat,lng:destination.lng
           }
        )
    // console.log(dist*0.000621374);
        setDistance(dist*0.000621374)
    }
  return (
    <div>

    

    <div className='p-2 md:p-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a Ride</p>
        <LocationInput type='source'/>
        <LocationInput type='destination'/>
        <button className='p-4 bg-black w-full mt-5 text-white rounded-lg'
        onClick={()=>calculateDistance()}
        >Search</button>
    </div>
    {distance?<CarListOptions distance={distance}/>:null}
    </div>
  )
}

export default SearchPanel