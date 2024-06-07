import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import icon from "../../../../../public/Images/phyIcon.png";
import ReactDOMServer from 'react-dom/server';
import Chart from 'chart.js/auto';
import 'leaflet';
import { Box, SvgIcon, Grid, Typography} from '@mui/material';
import { spacing } from '@mui/system';

const PieChart = ({ percentage, idPlant }) => {
    const dynamicPercentage = Math.min(Math.max(percentage, 0), 100);
    const endAngle = dynamicPercentage * 3.6;
    const largeArcFlag = endAngle > 180 ? 1 : 0;
    const radianEndAngle = (endAngle * Math.PI) / 180;

    const x1 = 50 + 50 * Math.cos(0);
    const y1 = 50 + 50 * Math.sin(0);
    const x2 = 50 + 50 * Math.cos(radianEndAngle);
    const y2 = 50 + 50 * Math.sin(radianEndAngle);

    return (
      <Grid container alignItems="center" justifyContent="center" className={'icon-chart-container'} style={{backgroundColor: 'rgba(255,255,255,0)'}}>
          <div style={{ width: '23px', height: '23px', borderStyle: 'solid', borderColor: '#0015ff', borderWidth: '3px', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'#00c4ff' }}>
              <Grid item style={{ textAlign: 'center', height: '17px', width: '17px', transform: 'rotate(-45deg)' }} border>
                  {idPlant}
              </Grid>
              { /*

                <Grid item className="pie-chart-container">
                    <div style={{backgroundColor:"blue", borderRadius:"50%", width:'25px', height:'25px'}}>
                        <SvgIcon viewBox="0 0 100 100">
                            <path
                                d={`M50 50 L${x1} ${y1} A50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                fill="green"
                            />
                        </SvgIcon>
                    </div>
                </Grid>

                */

                }

            </div>
        </Grid>
    );
};

const MarkerPlant = (props) => {
    const [lat, setLat] = useState(props.position[0]);
    const [lon, setLon] = useState(props.position[1]);
    const [ele, setEle] = useState(props.position[2]);
    const greenPercentage = 15; // Puoi impostare il valore desiderato per la fetta verde
    const dynamicPercentage = Math.floor(2 * (100 - greenPercentage)) + 1;
    const [popupOpen, setPopupOpen] = useState(false);

    // console.log('----------------------- //////////////////')
    // console.log(props)
    // console.log('----------------------- //////////////////')

    const onClickNode = (event) => {
        props.setImpiantoSelected(props.idNode)
    };

    let classPlant = props.status === 'base' ? 'plant-marker-base' : 'plant-marker-gen';

    const cuIcon = L.divIcon({
        iconSize: [23, 23],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0],
        shadowSize: [20.5, 20.5],
        html: ReactDOMServer.renderToStaticMarkup(
            <PieChart percentage={dynamicPercentage} idPlant={props.idNode} />
        ),
        className: 'custom-marker'
    });

    return (
        <Marker position={[lon, lat]} icon={cuIcon} eventHandlers={{ click: onClickNode }}> </Marker>
    );
};


export default MarkerPlant;