import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const MapsProvider = ({ children }) => (
  <LoadScript
    libraries={['places']}
    googleMapsApiKey={import.meta.env.NEXT_PUBLIC_GOOGLE_API_KEY}
  >
    {children}
  </LoadScript>
);

export default MapsProvider;
