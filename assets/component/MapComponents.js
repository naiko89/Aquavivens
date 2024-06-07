import { MapContainer, LayersControl, Pane, LayerGroup } from "react-leaflet";
import MapLayersControl from "./map/layers/MapLayersControl";
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react"
import Control from 'react-leaflet-custom-control'
import MarkerStationStato from "./map/geometries/marker/MarkerStationStato";
import MarkerStationPrelievo from "./map/geometries/marker/MarkerStationPrelievo";
import MarkerPlant from "./map/geometries/marker/MarkerPlant";
import PolylineFlumen from "./map/geometries/PolylineFlumen";
import ModalStationStato from "./modal/ModalStationStato"
import ModalStationPrelievo from "./modal/ModalStationPrelievo";
import ModalImpianto from "./modal/ModalImpianto";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper } from '@mui/material';
import HeuristicSupport from "../Service/HeuristicSupport";
import DataBaseSupport from "../Service/DataBaseSupport";

const TEST_SITE_KEY = "6Lcb-xspAAAAAEdlTcyQj_Mr1X8ShfiEpoJLTGv3";
const MapComponents = (props) => {
    const [centerMap, setCenterMap] = useState([46.22595539890122, 13.12801618447021])
    const[valuePointSeleThNode, setValuePointSeleThNode] = useState(false)
    const [selectedStationId ,setSelectedStationId] = useState(null) //__>attento che qui ricarica la mappa va messo più in profondità
    const [selectedPrelievoId, setPrelievoSelectedId] = useState(null) //__>attento che qui ricarica la mappa va messo più in profondità...vero che se modificassimo i dati nel modal qui andrebbe bene per il ricarlolo dell'intera struttura
    const [selectedImpiantoId, setImpiantoSelectedId] = useState(null)
    const heuristic = new HeuristicSupport(props.rivers,props.stazioniPrelievo);
    const [nodeGraph, setNodeGraph] = useState(heuristic.calcNode())
    const dataSupport = new DataBaseSupport(props.storicoPrelievo)

    let MyMapContainer = () => {

      return ( <MapContainer className={'my-component-map'} center={centerMap} zoom={10} scrollWheelZoom={true} zoomControl={false}>
        <MapLayersControl></MapLayersControl>
        <LayersControl position="topright" isSingleSelection={false}>

          <Pane name="firstLevel" style={{zIndex: 400}}>
            <LayerGroup key="1">
              {/*props.nodes.map((node,index)=>(
                      <MarkerNode key={node.properties.fid}
                                  position={node.geometry.coordinates}
                                  id={node.properties.fid}
                      />
                    ))
                    */}
              {props.stazioniStato.features.map((node, index) => (
                <MarkerStationStato key={index}
                                    idNode={index}
                                    position={node.geometry.coordinates}
                                    dimension={node.properties.dimens}
                                    status={node.properties.status}
                                    bacino={node.properties.bacino}
                                    setStationSelected={setSelectedStationId}
                                    colorValue={node.properties.statoAmbi}
                />
              ))
              }
            </LayerGroup>
          </Pane>

          <Pane name="thirdLevel" style={{zIndex: 500}}>
            <LayerGroup key="1">
              {props.impiantiDepurazione.features.map((node, index) => (
                <MarkerPlant key={index}
                             idNode={index}
                             position={node.geometry.coordinates}
                             dimension={node.properties.dimens}
                             setImpiantoSelected={setImpiantoSelectedId}
                />
              ))
              }
            </LayerGroup>
          </Pane>



          

          <Pane name='secondLevel' style={{zIndex: 300}}>
            {props.stazioniPrelievo.features.map((node, index) => (
              <MarkerStationPrelievo key={index}
                                     position={node.geometry.coordinates}
                                     idNode={index}
                                     codePoint={node.properties.codePunto}
                                     setPrelievoSelected={setPrelievoSelectedId}
              />
            ))
            }
          </Pane>

          <Pane name="fourthLevel" style={{zIndex: 200}}>
            <LayerGroup key="2">
              {props.rivers.features.map((polyline, index) => (
                <PolylineFlumen key={index}
                                fid={polyline.properties.fid}
                                positions={polyline.geometry.coordinates}
                                type={polyline.properties.tipo}
                                name={polyline.properties.nome}
                                id={index}
                />
              ))
              }
            </LayerGroup>
          </Pane>

        </LayersControl>

        <Control prepend position='bottomright'>
          <Paper elevation={6} style={{padding: '5px', backgroundColor: 'white', border: '1px solid #c2bfbb'}}>
            Spazio per la legenda
          </Paper>
        </Control>

      </MapContainer> )
    }

    return (
      <>
        <MyMapContainer></MyMapContainer>

          {
            selectedStationId === null ? null :
              <ModalStationStato station={props.stazioniStato.features[selectedStationId]} closeStation={setSelectedStationId} heuristic={heuristic}/>
          }

          {
            selectedPrelievoId === null ? null :
              <ModalStationPrelievo prelievo={props.stazioniPrelievo.features[selectedPrelievoId]}
                                    closePrelievo={setPrelievoSelectedId}
                                    dataSupport = {dataSupport}
                                    heuristic={heuristic}/>
          }
        {
          selectedImpiantoId === null ? null :
            <ModalImpianto impianto={props.impiantiDepurazione.features[selectedImpiantoId]}
                                  closeImpianto={setImpiantoSelectedId}
                                  dataSupport = {props.virtualImpiantiIn}
                                  virtualIn = {props.virtualImpiantiIn.features[Math.floor(Math.random() * props.virtualImpiantiIn.features.length)]}
            />


        }

      </>

    );
};


export default MapComponents