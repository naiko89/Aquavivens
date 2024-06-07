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
import PrelievoTabs from "../tabs/PrelievoTabs";

let ModalStationStato = (props) => {
  let prelievo = props.prelievo.properties
  const handleClose = () => props.closePrelievo(null);


  let parametriGroup = {
    insetticidi : [],
    farmaci: [],
    acqua: []
  }

  function filtraDatiPerChiave(dati, chiave) {
    const filtrati = dati[chiave] || [];
    return filtrati.reduce((acc, dato) => {
      const data = dato.properties.DataEN;
      if (!acc[data]) {
        acc[data] = [];
      }
      acc[data].push(dato);
      return acc;
    }, {});
  }


  const insetticidi = ["Acetamiprid", "Aclonifen", "Alachlor", "Aldrin", "Boscalid", "Chlorfenvinphos", "Chlorpiriphos", "Cybutryne", "Fenthion", "Thiamethoxam"];
  const farmaci = ["Carbamazepina", "Diclofenac", "Ibuprofene", "Sulfamethoxazole", "Diazinon", "Omethoate", "Methamidophos", "Methidathion", "Imidacloprid", "Fludioxonil"];
  const parametriAcqua = ["Ammonio", "Calcio", "Fosforo totale", "Magnesio", "Nitrati", "Nitriti", "Ossigeno disciolto", "pH", "Conducibilità elettrica a 20°C", "Durezza totale"];


  const dati = props.dataSupport.getStoricoPrelievo(props.prelievo.properties.codePunto)

  console.log(parametriGroup)


  insetticidi.forEach(chiave => {
    parametriGroup.insetticidi.push({ [chiave] : filtraDatiPerChiave(dati, chiave)})
  });

  farmaci.forEach(chiave => {
    parametriGroup.farmaci.push({ [chiave] : filtraDatiPerChiave(dati, chiave)});
  });

  parametriAcqua.forEach(chiave => {
    parametriGroup.acqua.push({ [chiave] : filtraDatiPerChiave(dati, chiave)});
  });

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="environmental-status-modal-title"
      aria-describedby="environmental-status-modal-description"
      className={'mt-3 small'}
    >
      <div className={'container'}>
        <div
          className="bg-light p-4 col-12"
          style={{
            borderRadius: '8px',
            backgroundColor: 'white',
          }}
        >
          <div className={'row'}>

            <Box mb={2} className='col-lg-4 col-md-5 col-sm-12'>
              <Card>
                <CardMedia
                  component="img"
                  alt="Punto Di Prelievo"
                  height="100"
                  image="/Images/prelievoPunto.gif"
                  title="Punto di Prelievo fluviale"
                  className="img-fluid"

                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Punto Di Rilevamento
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Desrizione vedere se importare...
                  </Typography>
                </CardContent>
              </Card>

              <TableContainer component={Paper} className={'mt-2'}>
                <Typography variant="h6" className={'text-center'}>Informazioni Del Punto Di Prelievo</Typography>
                <Table size="small">
                  <TableBody>
                    {[
                      ["Corpo Idrico", prelievo.codeIdrico],
                      ['Denominazione Idrica', prelievo.nomeIdrico],
                      ["Provincia", prelievo.prov],
                      ["Comune", prelievo.com],
                      ["Codice Punto Prelievo", prelievo.codePunto],
                      ["Profondità", prelievo.prof],
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

            <Box mb={2} className='col-lg-8 col-md-6 col-sm-12'>
              <PrelievoTabs parametri={parametriGroup}></PrelievoTabs>
            </Box>

          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalStationStato