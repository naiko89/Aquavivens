import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import icon from "../../../../../public/Images/phyIcon.png";
import ReactDOMServer from 'react-dom/server';
import Chart from 'chart.js/auto';
import 'leaflet';
import { Box, SvgIcon, Grid, Typography, Modal} from '@mui/material';
import { spacing } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';

const StationIcon = ({ props }) => {
  return (
    <Grid container alignItems="center" justifyContent="center" className={'icon-chart-container'} style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)', width: '17px', height: '17px' }}>
      <div style={{ borderRadius: '50%',
        display: 'flex',
        fontSize: '8px',
        fontWeight: 'bold',
        fontFamily: 'Arial, Helvetica, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(70,210,255)',
        width: '17px', height: '17px',
        border: '1px solid black' }}>
        {props.idNode}
      </div>
    </Grid>
  );
};

const MarkerStationStato = (props) => {
  const [lat, setLat] = useState(props.position[0]);
  const [lon, setLon] = useState(props.position[1]);
  const [ele, setEle] = useState(props.position[2]);


  const onClickNode = (event) => {
    props.setPrelievoSelected(props.idNode)
    console.log(props.idNode)
  };


  const cuIcon = L.divIcon({
    iconSize: [26, 26], // Assicurati che questa dimensione corrisponda alla dimensione totale dell'icona
    iconAnchor: [13, 13], // Imposta l'ancoraggio al centro dell'icona
    popupAnchor: [0, -10], // Regola il popup se necessario
    shadowSize: [20, 20], // Assicurati che questa dimensione corrisponda alla dimensione totale dell'icona
    html: ReactDOMServer.renderToStaticMarkup(
      <StationIcon props={props}></StationIcon>
    ),
    className: 'custom-marker'
  });




  return (
    <Marker position={[lon, lat]} icon={cuIcon} eventHandlers={{ click: onClickNode }}> </Marker>
  );
};


export default MarkerStationStato;