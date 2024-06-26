import './bootstrap.js';
import './styles/app.css'
import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom/client"
import MapComponents from "./component/MapComponents";
import Recapt from "./Service/Recapt";
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';


const root = ReactDOM.createRoot(
    document.getElementById('main')
);

const ArmorComponent = () => {
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const [geojsonDataPolilyne, setGeojsonDataPolilyne] = useState(null)
    const [idNodes, setIdNodes] = useState([])
    const [prelieviLedra, setPrelieviLedra] = useState(null)
    const [stazioniStatoEcologico, setStazioniStatoEcologico] = useState(null)
    const [stazioniPrelievo, setStazioniPrelievo] = useState(null)
    const [areYouHuman, setAreYouHuman] = useState(false)
    const [storicoPrelievo, setStoricoPrelievo] = useState(null)
    const [impiantiDepurazione, setImpiantiDepurazione] = useState(null)
    const [inImpiantiVirtual, setInImpiantiVirtual] = useState(null)

    const handleResize = () => {
        const newHeight = window.innerHeight
        const newWidth = window.innerWidth
        setHeight(newHeight)
        setWidth(newWidth)
    }
    window.addEventListener("resize", handleResize) //useEffect(() => {handleResize(); return () => window.removeEventListener("resize", handleResize)}, [])


    console.log(prelieviLedra)

    useEffect(() => {
        async function fetchData() {
            try {
                const riversResponse = await fetch('/MapGeometry/RiversLines.geojson');
                if (!riversResponse.ok) throw new Error('Errore nel caricamento di riverLines.geojson');
                const riversData = await riversResponse.json();

                const dataLedraResponse = await fetch('/MapGeometry/LedraAgganciatoUni.geojson');
                if (!dataLedraResponse.ok) throw new Error('Errore nel caricamento di LedraHookedPlants.geojson');
                const dataLedraUni = await dataLedraResponse.json();

                const responseStazioniStato = await fetch('/MapGeometry/StazioniStatoEcologico.geojson');
                if (!responseStazioniStato.ok) throw new Error('Errore nel caricamento di StazioniStatoEcologico.geojson');
                const stazioniStatoEcologico = await responseStazioniStato.json();

                const responseStazioniPrelievo = await fetch('/MapGeometry/StazioniPrelievo.geojson');
                if (!responseStazioniStato.ok) throw new Error('Errore nel caricamento di StazioniPrelievo.geojson');
                const stazioniPrelievo = await responseStazioniPrelievo.json();

                const responseStorico = await fetch('/MapGeometry/PrelieviStorico.geojson');
                if (!responseStorico.ok) throw new Error('Errore nel caricamento di PrelieviStorico.geojson');
                const storicoPrelievo = await responseStorico.json();

                const responseImpiantiDepurazione = await fetch('/MapGeometry/ImpiantiDepurazione.geojson')
                if(!responseImpiantiDepurazione.ok) throw new Error('Errore nel caricamento di ImpiantiDepurazione.geojson')
                const impiantiDepurazione = await responseImpiantiDepurazione.json();

                const responseInVirtualImpianti = await fetch('/MapGeometry/ImpiantiVirtualIn.geojson')
                if(!responseInVirtualImpianti.ok) throw new Error('Errore nel caricamento di ImpiantiVirtualIn.geojson')
                const impiantiDepurazioneInVirtual = await responseInVirtualImpianti.json();

                setIdNodes([]);
                setGeojsonDataPolilyne(riversData);
                setAreYouHuman(true)
                setStazioniStatoEcologico(stazioniStatoEcologico)
                setStazioniPrelievo(stazioniPrelievo)
                setStoricoPrelievo(storicoPrelievo)
                setImpiantiDepurazione(impiantiDepurazione)
                setInImpiantiVirtual(impiantiDepurazioneInVirtual)
                setPrelieviLedra(dataLedraUni)

                console.log('Hai finito di caricare i dati')
            } catch (error) {
                console.error('Errore nel caricamento del file GeoJSON:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            { areYouHuman === false ?
                <Container maxWidth={false} style={{ height: '100vh', display: 'flex',
                    margin: '0px',
                    padding:'0px',
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
                    {
                        <MapComponents rivers={geojsonDataPolilyne}
                                       idNodes={idNodes}
                                       prelieviLedra={prelieviLedra}
                                       stazioniStato={stazioniStatoEcologico}
                                       stazioniPrelievo={stazioniPrelievo}
                                       storicoPrelievo={storicoPrelievo}
                                       impiantiDepurazione={impiantiDepurazione}
                                       virtualImpiantiIn={inImpiantiVirtual}
                        />

                    }
                  </div>

                    }
        </div>
                );
            };
root.render(<><ArmorComponent/></>)