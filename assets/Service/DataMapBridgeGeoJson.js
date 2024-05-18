import React, { useEffect, useState } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import PolylineFlumen from "../component/map/geometries/PolylineFlumen";
import MarkerNode from "../component/map/geometries/MarkerNode";
import MarkerPlant from "../component/map/geometries/MarkerPlant";
import MarkerChemy from "../component/map/geometries/MarkerChemy";
import MarkerStation from "../component/map/geometries/MarkerStation";
import hash from 'object-hash';
import 'leaflet-polylinedecorator';



function DataMapBridgeGeoJson({data, type, viewer, handlerPlantValues, toggleModal}) {
    const [geojsonData, setGeojsonData] = useState(data);
    // const []
    const handleNodeClick = (id, type) => {
        viewer(id, type)
    }


    let dataModalPointHandler= (reactComponent) =>{
        alert('vai');
        toggleModal(reactComponent)
    }
    // console.log('-----------'+type) // console.log(data)









    return (
        <>
            <LayerGroup key= {hash (geojsonData)}>
                {type==='line' ? (
                    data.features.map((polyline, index) => (
                        <PolylineFlumen
                            fid={polyline.properties.fid}
                            positions={polyline.geometry.coordinates}
                            key={index}
                            type={polyline.properties.tipo}
                            name={polyline.properties.nome}
                            color="blue"
                            viewer={viewer}
                            id={index}
                        />
                    ))
                ):''}


                {type==='node' ? (
                  data.map((node,index)=>(

                    <MarkerNode
                          key={node.properties.fid}
                          position={node.geometry.coordinates}
                          id={node.properties.fid}
                          viewer={handleNodeClick}
                      />

                    ))
                ): ''}


                {type==='stazioni' ?
                    data.features.map((node,index)=>(
                        <MarkerStation
                            key={index}
                            idNode={index}
                            viewDataModal = {dataModalPointHandler}
                            position={node.geometry.coordinates}
                            dimension={node.properties.dimens}
                            status = {node.properties.status}
                            bacino = {node.properties.bacino}
                        />
                    )) : ''
                    }
            </LayerGroup>
        </>
    );
}



export default DataMapBridgeGeoJson