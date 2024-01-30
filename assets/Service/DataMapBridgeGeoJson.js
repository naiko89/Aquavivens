import React, { useEffect, useState } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import PolylineFlumen from "../component/map/geometries/PolylineFlumen";
import MarkerNode from "../component/map/geometries/MarkerNode";
import MarkerPhys from "../component/map/geometries/MarkerPhys";
import MarkerChemy from "../component/map/geometries/MarkerChemy";
import hash from 'object-hash';
import 'leaflet-polylinedecorator';


function DataMapBridgeGeoJson({data, type, viewer}) {
    const [geojsonData, setGeojsonData] = useState(data);
    const handleNodeClick = (id, type) => {
        alert('sei al superiore'+ id + type)
        viewer(id, type)
    }

    console.log('-----------'+type)
    console.log(data)

    //type==='phyPoint' ? console.log(data) :''

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
                        <MarkerPhys
                            key={index}
                            position={node.geometry.coordinates}
                            dimension={node.properties.dimens}
                            status = {node.properties.status}
                            bacino = {node.properties.bacino}
                        />
                    )) : ''
                    }



            </LayerGroup>

        </>


        /*

         <MarkerPhys
                            key={index}
                            position={node.geometry.coordinates}
                        />


        *
        * {type==='phyPoint' ?
                data.features.map((node,index)=>(
                    <MarkerPhys
                        key={index}
                        position={node.geometry.coordinates}
                    />
            )) : ''}

            {type==='chePoint' ? data.features.map((node,index)=>(
                <MarkerChemy
                    key={node.properties.fid}
                    position={node.geometry.coordinates}
                />
            )) : ''}
        *
        * */


    );
}



export default DataMapBridgeGeoJson