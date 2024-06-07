import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import icon from "../../../../../public/Images/nodeIcon.png";
//import { makeStyles } from '@material-ui/core/styles';


const MarkerNode = (data, id) => {

    const [lat, setLat] = useState(data.position[0])
    const [lon, setLon] = useState(data.position[1])
    const [ele, setEle] = useState(data.position[2])
    const [color, setColor] = useState('black')



    const onClickNode = (event) => {
        data.viewer(data.id, 'node')
        //console.log('Dati del nodo selezionato')
        //console.log(data.id + '--' + lon + '--' + lat)
    }

    const onClickNodeLeftClick = (event) => {
        //setPolylineColor('#0043b2')
        setColor('red') //console.log(data) //alert('fid :'+poly.fid+' id:'+poly.id)
    }


    let tempIcon = '<div ' +
        'style="width: 20px; height: 20px; background: url('+icon+') center center / cover no-repeat; display: flex; align-items: center; justify-content: center; color: '+color+';font-weight: bold;font-size: 8px">' +
        data.id+'</div>'


    const customIcon = L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 10], // L'ancora è al centro dell'icona
        popupAnchor: [0, -10], // Ancoraggio del popup personalizzato
        shadowSize: [20.5, 20.5],
        html: tempIcon
    ,
    });

    console.log('sei dentro si');

    return(<Marker position={[lon,lat]} icon={customIcon} eventHandlers={{ click: onClickNode, contextmenu: onClickNodeLeftClick }}> </Marker>)

    //

}



//<Marker position={[lat,lon]}></Marker>
export default MarkerNode;