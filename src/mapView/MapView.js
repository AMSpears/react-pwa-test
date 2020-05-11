import React, { useState } from 'react';
import ReactMapGl, {
  Marker,
  Popup,
  // NavigationControl,
  // FullscreenControl
} from 'react-map-gl';
import * as data from '../data/data.json';
import Pin from '../location-pin.png';
import '../../secrets.js';
const markerBtn = {
  background: 'none',
  border: 'none',
};

const popupStyle ={
  color: 'white',
  background: 'none'
}

export const MapView = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7736,
    longitude: -73.9566,
    width: '100vw',
    height: '100vh',
    zoom: 13,
  });

  const [selectedState, setSelectedState] = useState(null);

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken = 'REPLACE THIS LINE WITH ACCESS TOKEN'
        mapStyle="mapbox://styles/gisellez/ck9yorghb2d811ipjrtgocomz"
        onViewportChange={(newport) => {
          setViewport(newport);
        }}
      >
        { data.newYorkCities.map(borough => (
          <Marker
            style = {markerBtn}
            key={borough.id}
            latitude={borough.latitude}
            longitude={borough.longitude}
          >
            <button
              type="button"
              style = {markerBtn}
              className = "mapboxgl-popup-conten"
              onClick={(ev) => {
                ev.preventDefault();
                setSelectedState(borough);
              }}
            >
              <img
                width="50px"
                height="50px"
                src={Pin}
                alt="city"
              />
            </button>
          </Marker>
        ))}
        {
          selectedState ? (
            <Popup
              style = {popupStyle}
              latitude={selectedState.latitude}
              longitude={selectedState.longitude}
              onClose={() => {
                setSelectedState(null);
              }}
            >
              <h2>{selectedState.city}</h2>
            </Popup>
          ) : null
            }
      </ReactMapGl>
    </div>
  );
};

export default MapView;
