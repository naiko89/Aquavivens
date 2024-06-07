import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import 'leaflet';
import { Grid } from '@mui/material';

const StationIcon = ({ props }) => {

  let statoAmb = props.colorValue

  const getStatusColor = (status) => {
    let color;
    switch (status) {
      case 'BUONO':
        color = 'green';
        break;
      case 'ELEVATO':
        color = 'blue';
        break;
      case 'SUFFICIENTE':
        color = 'orange';
        break;
      case 'SCARSO':
        color = '#ff4c00';
        break;
      case 'NON':
        color = '#ff4c00';
        break;
      default:
        color = 'black';
    }
    return color;
  };

  return (
    <Grid container alignItems="center" justifyContent="center" className={'icon-chart-container'}>
      <div style={{ width:'25px', borderStyle:'solid', borderColor:'darkgray', borderWidth:'1px'}}>
        <Grid item style={{textAlign:'center', fontSize:'12px', backgroundColor: getStatusColor(statoAmb), margin:'1px'}} border>
            {props.idNode }
        </Grid>
      </div>
    </Grid>
  );
};

const MarkerStationStato = (props) => {
  const [lat, setLat] = useState(props.position[0]);
  const [lon, setLon] = useState(props.position[1]);
  const [ele, setEle] = useState(props.position[2]);


  const onClickNode = (event) => {
    props.setStationSelected(props.idNode)
  };

  const cuIcon = L.divIcon({
    iconSize: [25, 25],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0],
    shadowSize: [20.5, 20.5],
    html: ReactDOMServer.renderToStaticMarkup(
      <StationIcon props={props} />
    ),
    className: 'custom-marker'
  });

  return (
    <Marker position={[lon, lat]} icon={cuIcon} eventHandlers={{ click: onClickNode }}> </Marker>
  );
};


export default MarkerStationStato;