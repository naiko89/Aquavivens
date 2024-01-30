import './bootstrap.js';
import './styles/app.css'
import leaflet from 'leaflet';
import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom/client"
import MapComponents from "./component/MapComponents";
import './styles/app.css';
import Recapt from "./Service/Recapt";
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import dataPlantBuilder from "./Service/DataPlantBuilder";






const root = ReactDOM.createRoot(
    document.getElementById('main')
);

const ArmorComponent = () => {
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const [geojsonDataPolilyne, setGeojsonDataPolilyne] = useState(null)
    // const [geojsonDataNodi, setGeojsonDataNodi] = useState(null)
    const [calcNodesGeomKey, setCalcNodesGeomKey] = useState(null)
    const [idNodes, setIdNodes] = useState([])
    const [geojsonDataPhyUnique, setGeojsonDataPhyUnique] = useState(null)
    // const [geojsonDataCheUnique, setGeojsonDataCheUnique] = useState(null)
    const [geojsonHooksOnLedra, setGeojsonHooksOnLedra] = useState(null)

    const handleResize = () => {
        const newHeight = window.innerHeight
        const newWidth = window.innerWidth
        setHeight(newHeight)
        setWidth(newWidth)
    }
    window.addEventListener("resize", handleResize) //useEffect(() => {handleResize(); return () => window.removeEventListener("resize", handleResize)}, [])

    useEffect(() => {

        let dataJson = {CalcNodesGeomKey: '', idNodes: '',GeojsonDataPolilyne:'', GeojsonHooksOnLedra: '',GeojsonDataPhyUnique: '', Plants:{features:''}}

        fetch('/MapGeometry/alll.geojson')///MapGeometry/FiulanaDef.geojson all.geojson
            .then((response) => response.json())
            .then((data) => {
                const uniqueNodes = {}
                data.features.forEach((feature, id) => {
                    if (feature.geometry.type === 'LineString') {
                        const lineFid = feature.properties.fid
                        const startNode = feature.geometry.coordinates[0]
                        const endNode = feature.geometry.coordinates[feature.geometry.coordinates.length - 1]
                        const startNodeKey = `${startNode[0]},${startNode[1]}`
                        const endNodeKey = `${endNode[0]},${endNode[1]}`
                        if (!uniqueNodes[startNodeKey]) {
                            uniqueNodes[startNodeKey] = { type: 'Point', coordinates: startNode, lineRelations: [] }
                        }
                        if (!uniqueNodes[endNodeKey]) {
                            uniqueNodes[endNodeKey] = { type: 'Point', coordinates: endNode, lineRelations: [] }
                        }

                        uniqueNodes[startNodeKey].lineRelations.push({
                            nodeId: false,
                            lineId : id,
                            lineFid: lineFid, // Utilizza l'ID univoco della linea come ID
                            verse: 1,
                            pointEnd: endNode,
                            type: 'start'
                        })

                        uniqueNodes[endNodeKey].lineRelations.push({
                            nodeId: false,
                            lineId : id,
                            lineFid: lineFid, // Utilizza l'ID univoco della linea come ID
                            verse: -1, // Relazione -1 quando entriamo nel nodo
                            pointStart: startNode,
                            type: 'end'
                        })
                    }
                });
                for (const key in uniqueNodes) {
                    if (uniqueNodes.hasOwnProperty(key)) {
                        const node = uniqueNodes[key]
                        const newIdNode = idNodes.length
                        idNodes[newIdNode] = {
                            type: 'Feature',
                            properties: {
                                name: node.name,
                                fid: newIdNode,
                                realtionsFidPoly : node.lineRelations
                            },
                            geometry: {
                                type: 'Point',
                                coordinates: node.coordinates
                            }
                        }
                        node.lineRelations.map( relation =>{
                            const keyToFind = relation.pointStart ? relation.pointStart[0] + ',' + relation.pointStart[1]
                                : relation.pointEnd ? relation.pointEnd[0] + ',' + relation.pointEnd[1] : null;
                            let idRel = 0
                            for(const keyRel in uniqueNodes) {
                                if(keyRel === keyToFind) {
                                    if (!idNodes[newIdNode].properties.relationsLines) {
                                        idNodes[newIdNode].properties.relationsLines = []
                                    }
                                    relation.nodeId = idRel
                                    idNodes[newIdNode].properties.relationsLines.push({relation})
                                    break
                                }
                                else{ idRel++ }
                            }
                        })
                    }}
                dataJson.CalcNodesGeomKey = uniqueNodes
                dataJson.idNodes = idNodes
                return data;
            }).then((dataPoly) => {
            fetch('/MapGeometry/LedraAgganciato.geojson') ///--->qui ho il caricamentgo del geojson/xmls del ledra
                .then((response) => response.json())
                .then(dataPlants=>{
                    dataJson.GeojsonDataPolilyne = dataPoly
                    dataJson.Plants.features = dataPlantBuilder(dataPlants, dataPoly)
                    dataJson.GeojsonDataPhyUnique = dataPlants
                })
            //dataPlantBuilder(data, geojsonDataPolilyne);
        }).then(() =>{
            fetch('/MapGeometry/PhyPoints.geojson')
                .then((response) => response.json())
                .then((data) => {
                    setCalcNodesGeomKey(dataJson.CalcNodesGeomKey)
                    setIdNodes(dataJson.idNodes)
                    setGeojsonDataPhyUnique(dataJson.GeojsonDataPhyUnique)
                    setGeojsonDataPolilyne(dataJson.GeojsonDataPolilyne)
                    setGeojsonHooksOnLedra(dataJson.Plants)
                    console.log('hai finito di caricare i dati')
                })
                .catch((error) => {
                    console.error('Errore nel caricamento del file GeoJSON:', error);
                })
                .catch((error) => {
                    console.error('Errore nel caricamento del file GeoJSON:', error);
                });
        })




    }, []);



    const[areYouHuman, setAreYouHuman] = useState(false) //--->se entri dritto il caricamento dei dati avviene in maniera asincrona ma sbagliata serve un if sul rendering
    return (
        <div>
            { areYouHuman === false ?
                <Container maxWidth={false} style={{ height: '100vh', display: 'flex',
                    margin: '0px',
                    flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', backgroundColor:'lightblue',
                    backgroundImage: 'url("https://i.postimg.cc/6qM20gNK/sfondo.jpg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'}}>
                    <Card style={{ marginBottom: '20px', width: '80%', maxWidth: '600px' }}>

                        <CardContent>
                            <Typography variant="body1">
                                Per accedere al programma dimostrare che non siete dei robot
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Benvenuto su Aquavivens!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Aquaviviens è una piattaforma test per la visualizzazione e la definizione delle grandezze ambientali quali la tossicità nei corpi idrici.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Sfruttando la visualizzazione grafica per cercare di semplificare la comprensione dell'ambiente acquatico superficiale fluviale.
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Per maggiore informazioni
                                <a style={{marginLeft:"2px"}} href="mailto:n.buffo89@gmail.com">inviami un'email</a>
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                        <Recapt setVisitorType={setAreYouHuman}/>
                    </div>
                </Container>


                : <div id="my-map-box" style={{ width: width + 'px', height: height + 'px' }}>
                    {<MapComponents polylines={geojsonDataPolilyne} nodes={calcNodesGeomKey} idNodes={idNodes} hookOnLedra={geojsonHooksOnLedra} plants={geojsonHooksOnLedra}/>}
                </div>

                    }
                </div>
                );
            };


            root.render(<><ArmorComponent/></>)