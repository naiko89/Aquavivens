import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import icon from "../../../public/Images/cheIcon.png";

const MarkerChemy = (data) => {
    const [lat, setLat] = useState(data.position[0])
    const [lon, setLon] = useState(data.position[1])
    const [ele, setEle] = useState(data.position[2])

    const onClickNode = (event) => {
        alert('PRESA CHIMICA '+JSON.stringify(data));
    }

    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [20.5, 20.5],
        iconAnchor: [10.25, 10.25], // L'ancora è al centro dell'icona
        popupAnchor: [0, -17], // Ancoraggio del popup personalizzato
        shadowSize: [20.5, 20.5],
    });

    return(<Marker position={[lon,lat]} icon={customIcon} eventHandlers={{ click: onClickNode }}></Marker>)

}



//<Marker position={[lat,lon]}></Marker>
export default MarkerChemy;