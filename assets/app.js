import './bootstrap.js';
import './styles/app.css'
import leaflet from 'leaflet';
import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import MapComponents from "./component/MapComponents";
import './styles/app.css';






const root = ReactDOM.createRoot(
    document.getElementById('main')
);


const ComponenteConEvento = () => {
    // Definiamo uno stato iniziale per il nostro componente
    const [contatore, setContatore] = useState(0);

    // Funzione freccia per gestire l'evento di clic
    const gestisciClick = () => {
        setContatore(contatore + 1);
    };

    return (
        <div>
            {/* Aggiungiamo un pulsante che chiama la funzione di gestione dell'evento <button onClick={gestisciClick}>Clicca per Incrementare</button>*/}
        </div>
    );
};



root.render(<><ComponenteConEvento />
        <MapComponents />
</>)