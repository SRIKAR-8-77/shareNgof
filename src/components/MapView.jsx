import React, { useEffect, useState,useContext } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

function MapView() {
  const containerStyle = {
  width: '100%',
  height: '100%',
}


const {source,setSource}=useContext(SourceContext);
const {destination,setDestination}=useContext(DestinationContext);

const [center,setCenter] = useState({
  lat
: 
26.7983768,
lng
: 
81.0240627
});

  const [map, setMap] = React.useState(null)
  const [directionRoutePoints,setDirectionRoutePoints]=useState(null);
  
  useEffect(()=>{
  if(map && source?.lat != null && source?.lng != null){
    map.panTo(
        {lat: source.lat,
        lng: source.lng}
    )
    setCenter({
      lat: source.lat,
      lng: source.lng
    })
  }
}, [source])
useEffect(() => {
  if (map && source?.lat != null && source?.lng != null && destination?.lat != null && destination?.lng != null) {
    directionRoute();
  }
}, [source, destination, map]);

useEffect(()=>{
  if(map && destination?.lat != null && destination?.lng != null){
     map.panTo(
        {lat: destination.lat,
        lng: destination.lng}
    )
    setCenter({
      lat: destination.lat,
      lng: destination.lng
    })
  }
}, [destination])

    const directionRoute=()=>{
        const DirectionService=new google.maps.DirectionsService();

        DirectionService.route({
            origin:{lat:source.lat,lng:source.lng},
            destination:{lat:destination.lat,lng:destination.lng},
            travelMode:google.maps.TravelMode.DRIVING
        },(result,status)=>{
            if(status===google.maps.DirectionsStatus.OK)
            {
                setDirectionRoutePoints(result)
            }
            else{
                console.error('Error');
            }
        })
    }

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
   // SVG icon for source (yellowish orange)
  const sourceIcon = {
    url: `data:image/svg+xml;utf-8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='orange'>
        <path d='M128 16C74 16 32 64 32 120c0 72 96 136 96 136s96-64 96-136c0-56-42-104-96-104zm0 152a48 48 0 1 1 0-96 48 48 0 0 1 0 96z'/>
      </svg>`,
    scaledSize: new window.google.maps.Size(40, 40),
  };

  // SVG icon for destination (black)
  const destIcon = {
    url: `data:image/svg+xml;utf-8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='black'>
        <path d='M128 16C74 16 32 64 32 120c0 72 96 136 96 136s96-64 96-136c0-56-42-104-96-104zm0 152a48 48 0 1 1 0-96 48 48 0 0 1 0 96z'/>
      </svg>`,
    scaledSize: new window.google.maps.Size(40, 40),
  };

  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId:'94419189993fbcd05abaaa97'}}
    >
        {source?.lat != null && source?.lng != null ? <MarkerF
        position={{ lat: source.lat,lng: source.lng}}
        icon={sourceIcon}
        >
            <OverlayViewF
            position={{ lat: source.lat,lng: source.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className='p-2 bg-white font-bold inline-block'>
                    <p className='text-black text-[18px]'>{source.label}</p>
                </div>

            </OverlayViewF>

        </MarkerF>:null}
        {destination?.lat != null && destination?.lng != null ? <MarkerF
        position={{ lat: destination.lat,lng: destination.lng}}
        icon={destIcon}
        >
          <OverlayViewF
            position={{ lat: destination.lat,lng: destination.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className='p-2 bg-white font-bold inline-block'>
                    <p className='text-black text-[18px]'>{destination.label}</p>
                </div>

            </OverlayViewF>  
        </MarkerF>:null}

        {directionRoutePoints && 
        <DirectionsRenderer 
        directions={directionRoutePoints} 
        options={{polylineOptions:
            {
                strokeColor:'#00BCD4',
                strokeWeight:5
            },
            
            suppressMarkers:true}}/>}
    </GoogleMap>
  ) 
}

export default MapView