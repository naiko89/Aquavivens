import React, { useState, useEffect } from "react"
import {Button, Paper, Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Control from "react-leaflet-custom-control";
import Grid from "@mui/material/Grid";
import DateIntervalForm  from '../form/DateIntervalForm';
import FabricatePlantsValues from "../../../Service/FabricatePlantsValuesRicorsive";
import {aggregate, aggregateForTable} from "../../utilities"

////---->QUESTO e' il componente principale occhio
const PanelMainLateral = (data) => {

    const handlePanelValue = data.openPanelValue
    const [currentDateBol, setCurrentDateBol] = useState(undefined)
    const[fabbricateValues, setFabbricateValues] = useState()
    const [myClassInstance, setMyClassInstance] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [limitArray , setLimitArray] = useState()
    const [dateCurrent, setDateCurrent] = useState('')
    let dataPlantSelectedValues = ''

    // console.log('-------------') console.log(data.objData.plants) console.log('-------------')
    let myListAggregate = aggregate('status', data.objData.plants.features)

    //console.log(myListAggregate.generated)

    myListAggregate.generated = aggregate('bacino', myListAggregate.generated) // console.log(myListAggregate)
    useEffect(() => {
        // Inizializza la classe solo se non è già stata inizializzata
        if (!myClassInstance) {
            setMyClassInstance(new FabricatePlantsValues(aggregate('dimens', myListAggregate.base), data.objData.plants.features));
        }
    }, []);


    const intervalId = (() => {

        const dateKeys = Object.keys(myClassInstance.getIntervalDateValuesTot())
        const currentDate = dateKeys[currentIndex];
        let timesToOvercomesLimitArray = {}

        function eseguiCiclo(index) { ///---->Qui o arrivo con il calcolo della tossicità intervallo date
            if (index < dateKeys.length) {
                const currentDateKey = dateKeys[index];
                const currentDateData = myClassInstance.getIntervalDateValues(currentDateKey);
                // console.log('----------'); console.log(currentDateKey); console.log(currentDateData); console.log('----------');

                let verifyLimit = () => {  ///---->questa è la funzione per la gestione del limite
                    const limitValues = {"Alcalin_(mg/l-CaCO3)": 400,
                        "Ammoniaca_(mg/l-NH4)": 2,
                        "C-Tot_(UCF/100ml)": 50000,
                        "COD_(mg/l-O2)": 25.00,
                        "Cloruri_(mg/l-Cl)": 10,
                        "Cond_(mS/cm)": 12000,
                        "E.-coli_(UCF/100ml)": 3000,
                        "FosforoTot_(mg/l-P)": 2.8,
                        "Nitrati_(mg/l-N)": 10.2,
                        "Nitriti_(mg/l-N)": 0.400,
                        "OD_ (%)": 110.00,
                        "OD_(mg/l)": 15.00,
                        "Ortofosfato_(mg/l-PO4)": 3,
                        "Solfati_(mg/l-SO4)": 100.98,
                        UV254: 0.4274,
                        nSpecimen: 18,
                        nTaxa: 2,
                        pH: 10}



                    currentDateData.map((dataDayPlant, index) =>{
                        Object.entries(dataDayPlant.properties).forEach(([key, val])=>{
                            if(['id','status','T_(C)'].includes(key)=== false){
                                if(val > limitValues[key]) {
                                    if(!timesToOvercomesLimitArray[index]) {
                                        timesToOvercomesLimitArray[index] = {id:index, nLimit:0, valLimit:[] }
                                    }
                                    timesToOvercomesLimitArray[index].nLimit++
                                    timesToOvercomesLimitArray[index].valLimit.push({ key:key ,data:currentDate })

                                    /*
                                    console.log('----LIMITE SUPERATO----PER IL PLANT'+index)
                                    console.log(key)
                                    console.log(val)
                                    console.log(limitValues[key])
                                    console.log('---------')
                                    */

                                }
                            }
                        })
                    })
                    setDateCurrent(dateKeys[index])
                    setLimitArray(timesToOvercomesLimitArray)
                }

                setCurrentIndex(index + 1);
                verifyLimit()//console.log('questo è il current implementato --->', index);
                // Richiama la funzione ricorsiva con un ritardo di 1000 millisecondi (1 secondo)
                setTimeout(() => {

                    eseguiCiclo(index + 1);
                }, 2000);
            } else {
                //console.log('Uscita dal ciclo');

            }
        }

        eseguiCiclo(0)

    });


    // console.log('questa è l aggregazione')
    // console.log(myListAggregate)

    // let basePlants = aggregateForTable(myListAggregate.base, 6)


    // let myListRender = {base: aggregateForTable(myListAggregate.base, 6), generated: []}


    let generatedPlants=Object.entries(myListAggregate.generated).map(([waterBasin, plants]) => {
        //console.log(waterBasin)
        if(myListRender.generated[waterBasin]) { myListRender.generated[waterBasin] = '' }
        // console.log('///////////////') console.log(aggregateForTable(plants, 6)) console.log('///////////////')
        return myListRender.generated[waterBasin] = aggregateForTable(plants, 6)
        //myListRender.generated[waterBasin] = aggregateForTable(plants, 6)
        //console.log(key)console.log(plant)

    })



    if(data.plantSelected !== null){

        dataPlantSelectedValues = data.objData.plants.features.filter((value, index)=>{

            return index === data.plantSelected.idNode
        })

        /*
        * console.log('??????????????????')
        * console.log('--------------------')
        * console.log(dataPlantSelectedValues)
        * console.log(myClassInstance.getIntervalDateValuesTot())
        * */

    }






    return (
        <div>
            <Control prepend position='topleft' >

                 <Paper elevation={6} style={{ padding: '0px', backgroundColor: 'rgba(255,255,255,0.63)', border: '1px solid #c2bfbb', height: data.height, width:'auto' }} >

                <div>
                    <Button variant="outlined" style={{backgroundColor: '#ffffff91', marginRight:'1px'}}
                            onClick={()=>{}}>
                        Totali
                    </Button>
                    {/*
                    <Button variant="outlined" style={{backgroundColor: '#ffffff91'}}
                            onClick={()=>{}} className={'btn btn-secondary btn-sm'}>
                        <div>Modello di flusso</div>
                    </Button>
                    */}

                </div>



                { handlePanelValue === 'total' ?
                        <div>
                            <table>

                                {
                                    basePlants.map((plantsRow, index) =>{

                                    return plantsRow.map((plant, index) => {
                                        //console.log(plant)
                                        //console.log(index)
                                        return ''//JSON.stringify(plant)
                                    })

                                    /*return <>
                                        <div key={plant} style={{ border: '1px solid #c2bfbb' }}> {plant} <br/></div>
                                    </>*/
                                })}

                            </table>


                        </div>
                    : handlePanelValue === 'plant' ?
                            <div>
                                <div style={{height:'8px'}}>
                                    {/*JSON.stringify(data.plantSelected)}
                                    {JSON.stringify(dataPlantSelectedValues)*/}
                                </div>
                            </div>

                            : <div> caso falso </div>

                }





            </Paper>
        </Control>
        </div>
    )
}

export default PanelMainLateral



/*PER IL MODELLO DI FLUSSO
handlePanelValue === 'fls' ?
                            <div>
                                <Grid container style={{width:'450px'}}>
                                    <Grid item style={{margin: '2px'}}>

                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Il calcolo del flusso è in fase di rendering sulla mappa</h5>
                                                <p className="card-text">Per vedere temporaneamente il calcolo del flusso del grafo selezionate il layer dei nodi delle linee,
                                                poi con console aperta selezionare un puto del grafo, i console log descrivono l'ordine della somma di grandezze di fonte sul grafo</p>
                                            </div>
                                        </div>


                                    </Grid>
                                    <Grid item style={{paddingLeft: '20px'}}></Grid>
                                    <Grid item style={{paddingLeft: '20px'}}></Grid>
                                </Grid>
                            </div>
                        :
*
*
* */