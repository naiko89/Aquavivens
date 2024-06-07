import React, { useState } from 'react';
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
  Tab,
  Collapse,
  ListItem,
  List

} from "@mui/material";

import { groupPrelevTab } from "../../Utilities/utilities";


function TabPanel(props) {
  const { children, index, ...other } = props;
  const [open, setOpen] = useState(null);

  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div role="tabpanel" id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
      {
        <Box p={3} >
          <List style={{maxHeight: '100%', overflow: "auto"}}>
            {props.data.map((sostanza, ind) => (
              <Paper key={ind} >
                <ListItem onClick={() => handleClick(ind)} className={'mt-1'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="title" style={{ flex: 1 }}>
                    <span>{sostanza.prelevato}</span>
                    <span className={'ms-2'}>Numero Prelievi : {sostanza.dati.length}</span>
                  </Typography>
                  <Typography className={'align-content-end'}>
                    {open === ind ? '-' : '+'}
                  </Typography>
                </ListItem>

                <Collapse in={open === ind} timeout="auto" unmountOnExit>
                  <TableContainer pl={4} >
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Data</TableCell>
                          <TableCell>UM</TableCell>
                          <TableCell>Risultato</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sostanza.dati.map((dato, i) => (
                          <TableRow key={i}>
                            <TableCell>{dato.data.toLocaleDateString()}</TableCell>
                            <TableCell>{dato.UM}</TableCell>
                            <TableCell>{dato.Risultato}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Paper>
            ))}
          </List>
        </Box>
      }
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PrelievoTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let data = ''

  if(value === 0){ data=props.parametri.farmaci }
  else if(value === 1){ data = props.parametri.insetticidi }
  else{ data = props.parametri.acqua }

  return (
    <>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Farmaci" {...allyProps(0)} />
          <Tab label="Insetticidi" {...allyProps(1)} />
          <Tab label="Valori Acqua" {...allyProps(2)} />
        </Tabs>

        <TabPanel value={value} data={groupPrelevTab(data)} index={value}></TabPanel>
    </>
  );
}