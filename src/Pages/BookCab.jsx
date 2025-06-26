"use client"
import React, { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ['places'];

const BookCab = () => {
  const [source,setSource]=useState([])
  const [destination,setDestination]=useState([])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY, // fix: use vite env convention
    libraries: {libraries},
  });

  if (!isLoaded) {
    return <div className="text-center p-10">Loading Google Maps...</div>;
  }

  return (
    <SourceContext.Provider value={{source,setSource}}>
      <DestinationContext.Provider value={{destination,setDestination}}>
    <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5 h-[120vh] '>
      <div className='h-full'>
        <SearchPanel/>
      </div>
      <div className="md:col-span-2 h-full">
        <MapView/>
      </div>
    </div>
    </DestinationContext.Provider>
    </SourceContext.Provider>
  );
};

export default BookCab;