import {LayersControl, TileLayer} from "react-leaflet";
import React from "react"

const MapLayersControl = () => {
    return(
        <LayersControl position="topright">
            <LayersControl.BaseLayer name="Mappa Standard" checked={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Rilievi">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Terreno'>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
                    />
            </LayersControl.BaseLayer>


        </LayersControl>
    )

}


export default MapLayersControl