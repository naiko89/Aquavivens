import React, { useEffect, useState } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import PolylineFlumen from "../component/map/geometries/PolylineFlumen";
import MarkerNode from "../component/map/geometries/MarkerNode";
import MarkerPlant from "../component/map/geometries/MarkerPlant";
import MarkerChemy from "../component/map/geometries/MarkerChemy";
import hash from 'object-hash';
import 'leaflet-polylinedecorator';


function DataMapBridgeGeoJson({data, type, viewer, handlerPlantValues}) {
    const [geojsonData, setGeojsonData] = useState(data);
    const [toggleModal, setToggleModal] = useState(false)
    // const []
    const handleNodeClick = (id, type) => {
        viewer(id, type)
    }

    let dataModalPointHandler= (data) =>{
        setToggleModal(true)
        handlerPlantValues(data)
    }

    // console.log('-----------'+type) // console.log(data)

    let modal= toggleModal === false ? '' : <div className={''}></div>


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
                    data.features.map((node,index)=>(
                        <MarkerNode
                            key={node.properties.fid}
                            position={node.geometry.coordinates}
                            id={node.properties.fid}
                            viewer={handleNodeClick}
                        />
                    ))
                ): ''}

                {type==='phyPoint' ?
                    data.features.map((node,index)=>(
                        <MarkerPlant
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