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
  Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React from "react";

let ModalStationStato = (props) => {
  let data = props.station
  const handleClose = () => props.closeStation(null);
  props.heuristic.calcProssimityStationStato(props.station)

  let statoEcologicoStyleTitle = (stato) => {
    let style = {backgroundColor : ''};
    switch (stato) {
      case 'NON':
        style.backgroundColor = 'rgba(250,125,0,0.1)';
        style.borderRadius = '5px';
        break;
      case 'BUONO':
        style.backgroundColor = 'rgba(0,157,44,0.1)';
        style.borderRadius = '5px';
        break;
      default:
        style.backgroundColor = 'white';
    }
    return style
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="environmental-status-modal-title"
      aria-describedby="environmental-status-modal-description"
      className={'mt-1 mb-2 small'}

    >
      <div className={'bg-light container p-0'} style={{borderRadius:'5px'}} >
        <div className="p-4 col-12">
          <div className={'row'}>

            <Box mb={2} className='col-lg-4 col-md-5 col-sm-12' >

              <Card>
                <CardMedia
                  component="img"
                  alt="Stazione di monitoraggio fluviale"
                  height="100"
                  image="/Images/stazioneAmb.gif"
                  title="Stazione di monitoraggio fluviale"
                  className="img-fluid p-2"

                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Stazione Monitoraggio Stati Ambientali
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Desrizione vedere se importare...
                  </Typography>
                </CardContent>
              </Card>


              <TableContainer component={Paper} className={'mt-2 p-2'}>
                <h5 className={'p-3'}>Informazioni Della Stazione</h5>
                <Table size="small">
                  <TableBody>
                    {[
                      ["Corpo Idrico", data.properties.corpoIdri],
                      ["Comune", data.properties.comune],
                      ["Condizioni", data.properties.condizioni],
                      ["Località", data.properties.localita],
                      ["Nome Fiume", data.properties.nomeFiume],
                      ["Macrotipi", data.properties.macrotipi],
                      ["Stato Monitormento", data.properties.statoMoni],
                      ["Stazione", data.properties.stazione],
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

            <Box mb={2} className='col-lg-8 col-md-7 col-sm-12'>
              <Paper className='row mb-2 p-2' style={statoEcologicoStyleTitle(data.properties.statoAmbi)}>
                <h6 className={'p-1'}>
                  <div className={'p-2'}>
                    Stato Ambientale: { data.properties.statoAmbi === 'NON' ? 'NON BUONO' : 'BUONO' }
                  </div>
                </h6>

                <TableContainer component={Paper} className={'pb-2'}>
                <h6 className={'p-3'}>Stato Ecologico: {data.properties.statoEcol}</h6>
                <Table size="small">
                  <TableBody>
                    {[
                      ["Diatomee", data.properties.diatomee],
                      ["Macrofite", data.properties.macrofite],
                      ["Macroinvertebrati", data.properties.macroinver],
                      ["Fauna Ittica", data.properties.faunaItti],
                      ["LIMeco", data.properties.liMeco],
                    ].map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TableContainer component={Paper} className={'mt-2 pb-2'}>
                <h6 className={'p-3'}>
                  Stato Chimico: {data.properties.statoChim}
                </h6>
                <Table size="small">
                  <TableBody>
                    {[
                      ["Sostanze Prioritarie", data.properties.sostanzeP],
                    ].map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalStationStato