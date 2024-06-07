import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React from "react";
import {PieImpianto} from "../graphs/PieImpianto";
import BarChart from "../graphs/BarChart";


let inputVirtual = (sostanze) => {
  let out = [
    { "Alachlor": { "out": 0.2 } },
    { "Boscalid": { "out": 0.1 } },
    { "Fosforo totale": { "out": 1.0 } },
    { "Nitriti": { "out": 0.5 } },
    { "Omethoate": { "out": 0.1 } },
    { "Cloruri (mg/l Cl)": { "out": 250 } },
    { "n taxa": { "out": "Varies" } },
    { "Aldrin": { "out": 0.03 } },
    { "Sulfamethoxazole": { "out": 0.1 } },
    { "Codice sito": { "out": "N/A" } },
    { "Conducibilità elettrica a 20°C": { "out": 2500 } },
    { "Posizione rispetto allo scarico": { "out": "N/A" } },
    { "Ortofosfato mg/l PO4": { "out": 0.5 } },
    { "OD %": { "out": 80 } },
    { "Ostracods": { "out": "Varies" } },
    { "Magnesio": { "out": 50 } },
    { "Methidathion": { "out": 0.1 } },
    { "h": { "out": "N/A" } },
    { "Durezza totale": { "out": 500 } },
    { "E. coli (UCF/100ml)": { "out": 0 } },
    { "Acetamiprid": { "out": 0.1 } },
    { "Calcio": { "out": 100 } },
    { "Diazinon": { "out": 0.1 } },
    { "UV254": { "out": 0.1 } },
    { "Methamidophos": { "out": 0.1 } },
    { "C tot (UCF/100ml)": { "out": "N/A" } },
    { "Ammonio": { "out": 0.5 } },
    { "Fosforo totale (mg/l P)": { "out": 1.0 } },
    { "Ammoniaca mg/l NH4": { "out": 0.5 } },
    { "Ossigeno disciolto": { "out": 8 } },
    { "Lat": { "out": "N/A" } },
    { "Ibuprofene": { "out": 0.1 } },
    { "Fludioxonil": { "out": 0.1 } },
    { "Long": { "out": "N/A" } },
    { "Imidacloprid": { "out": 0.1 } },
    { "Fenthion": { "out": 0.1 } },
    { "COD (mg/L O2)": { "out": 125 } },
    { "OD mg/l": { "out": 90 } },
    { "Sito": { "out": "N/A" } },
    { "Alcalinità totale (mg/l CaCO3)": { "out": 500 } },
    { "Thiamethoxam": { "out": 0.1 } },
    { "Solfati (mg/l SO4)": { "out": 250 } },
    { "Cond (mS/cm)": { "out": 2500 } },
    { "Carbamazepina": { "out": 0.1 } },
    { "Nitrati": { "out": 50 } },
    { "Nitrati mg/l N": { "out": 50 } },
    { "Comune": { "out": "N/A" } },
    { "n specimens": { "out": "Varies" } },
    { "T": { "out": "N/A" } },
    { "Data": { "out": "N/A" } },
    { "Aclonifen": { "out": 0.1 } },
    { "Diclofenac": { "out": 0.1 } },
    { "Nitriti mg/l N": { "out": 0.5 } },
    { "Chlorfenvinphos": { "out": 0.1 } },
    { "pH": { "out": 7 } },
    { "Chlorpiriphos": { "out": 0.1 } },
    { "Cybutryne": { "out": 0.1 } }
  ]
  let tmpOut = ''
  let ret = []


  // console.log('questo è di impianto', sostanze)

  Object.entries(sostanze).map(([key, valueIn]) => {
    tmpOut = Object.values(out.find(item => {
      return Object.keys(item)[0] === key
    }))[0].out //__>cambia struttura va :D
    ret.push({sostanza: key, in:valueIn , out:tmpOut, percentPie:( (1-tmpOut/valueIn) * 100) })
  });
  return ret
}


let ModalImpianto = (props) => {

  const [valuesToGraphs, setValuesPies] = React.useState(inputVirtual(props.virtualIn.properties.in));

  const handleClose = () => props.closeImpianto(null);
  const impianto = props.impianto.properties

  let GraphsComponentImpianto = (() =>
  {
    let pieGraphs = []
    let barGraphs = []
    valuesToGraphs.map((item, index) => {
      switch (item.sostanza) {
        case 'pH':
          barGraphs.push(
            <BarChart dataSet={item}></BarChart>
          );
          break;
        case 'Cond (mS/cm)':
          break;
        default:
          pieGraphs.push(<div key={index} className={'col-2 m-0 p-1'}>
            <PieImpianto dataSet={item} className={'mb-2 p-0'}></PieImpianto>
          </div>)
          break;
      }
    })
    console.log([...pieGraphs, ...barGraphs])

    return [...pieGraphs, ...barGraphs]
  })


  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="environmental-status-modal-title"
      aria-describedby="environmental-status-modal-description"
      className={'p-1'}
    >
      <div className={'container-fluid m-5 p-1'}>
        <div
          className="bg-light p-4 col-10 offset-1"
          align={'center'}
          style={{
            borderRadius: '8px',
            backgroundColor: 'white',
          }}
        >
          <div className={'row'}>

            <Box mb={2} className='col-lg-3 col-md-5 col-sm-12'>
              <Card>
                <CardMedia
                  component="img"
                  alt="Punto Di Prelievo"
                  height="100"
                  image="/Images/impianto.gif"
                  title="Punto di Prelievo fluviale"
                  className="img-fluid p-3"

                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Impianto Di Depurazione
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Desrizione vedere se importare...
                  </Typography>
                </CardContent>
              </Card>

              <TableContainer component={Paper} className={'mt-2'}>
                <Typography variant="h6" className={'text-center'}>Informazioni Dell'Impianto</Typography>
                <Table size="small">
                  <TableBody>
                    {[
                      ["Codice Ipianto", impianto.cod],
                      ['Aut', impianto.aut],
                      ["Comune", impianto.com],
                      ["Denominazione", impianto.den],
                      ["Gestore", impianto.gest],
                      ["Località", impianto.loc],
                      ["Provincia", impianto.prov],
                    ].map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Box>

            <Box mb={2} p={2} className='col-lg-9 col-md-6 col-sm-12' component={Paper}>
              <div className={'row '}>

                <Typography variant='h5' >
                  Abbatttimento inquinanti In|Out
                </Typography>

                <Box mb={2}>

                  {props.virtualIn.properties.livello_di_inquinamento}


                </Box>

              </div>
              <div className={'row'}>
                <div className={'col-1'}></div>
                <GraphsComponentImpianto></GraphsComponentImpianto>
                <div className={'col-1'}></div>
              </div>
            </Box>

          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalImpianto