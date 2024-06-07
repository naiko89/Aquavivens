import React, { useEffect, useState } from 'react';
import { Polyline, Tooltip} from 'react-leaflet';

let colorLine = (typeIdrico) => {
    let style = {color : '', size: ''};
    switch (typeIdrico) {
        case 'FIUME':
            style.color = 'rgba(0,117,250,0.9)';
            style.size = 5
            break;
        case 'CANALE':
            style.color = 'rgba(58,93,143,0.85)';
            style.size = 4
            break;
        case 'ROGGIA':
            style.color = 'rgba(58,93,143,0.85)';
            style.size = 3
            break;
        case 'TORRENTE':
            style.color = 'rgba(41,142,255,0.65)';
            style.size = 3
            break;
        case 'RIO':
            style.color = 'rgba(41,142,255,0.65)';
            style.size = 2
            break;
        case 'VALLONE':
            style.color = 'rgba(41,142,255,0.65)';
            style.size = 1
        default:
            style.color = 'rgba(41,142,255,0.65)';
            style.size = 2


    }
    return style;
}


const PolylineFlumen = (poly,viewer) => {
    const [show, setShow] = useState(true);
    const [polylineStyle, setPolylineStyle] = useState(colorLine(poly.type));
    // Funzione per scambiare latitudine e longitudine (leaflet prende al contrario del gejson??)

    const swapLatLong = (coordinates) => {
        return coordinates[0].map(coordinate => {
            if (Array.isArray(coordinate) && coordinate.length === 2) {
                const [lng, lat] = coordinate;
                return [lat, lng]; // Inverte latitudine e longitudine
            } else {
                console.error('Formato delle coordinate non corretto:', coordinate);
                return null;
            }
        });
    };

    // Converti le coordinate scambiandole
    const arrPolyGeo = swapLatLong(poly.positions);

    const onClickPoly = (event) => {
        // alert('LINEA ' + JSON.stringify(poly));
        // setPolylineColor('#c90b3d');
        // alert('primo livello')
        console.log(poly)

        //poly.viewer(poly.fid, 'line')
    }

    const onClickPolyLeftClick = (event) => {
        setPolylineColor('#0043b2')
        //console.log(poly)
        alert('fid :'+poly.fid+' id:'+poly.id)
    }

    return (
        <Polyline
            positions={arrPolyGeo}
            color={polylineStyle.color}
            pathOptions={{ color: polylineStyle.color }}
            weight={polylineStyle.size}
            selected={false}
            eventHandlers={{ click: onClickPoly, contextmenu: onClickPolyLeftClick  }}
            text={poly.name}
        />
    );



}




export default PolylineFlumen