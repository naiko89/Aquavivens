import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {Paper, Table, TableBody, TableCell, TableRow, Typography, TableContainer} from "@mui/material";
import {Pie} from "react-chartjs-2";
import React from "react";

export const PieImpianto = ({dataSet}) => {

  let percTrue = dataSet.percentPie.toFixed(2) <=0 ? 0 : dataSet.percentPie.toFixed(2)

  const data = {
    labels: ['% Rimosso'],
    datasets: [
      {
        data: [percTrue, 100 - percTrue],
        backgroundColor: ['#d4f1ee', '#eeeeee'],
        hoverBackgroundColor: ['#4ae3d7', '#dddddd']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        }
      }
    }
  };


  return (
    <Card className={'p-2'}>
      <CardContent className={'mb-0 pb-0'}>
        <div style={{height: '150px'}}>
          <Pie data={data} options={options}/>
        </div>
        <Typography variant={'caption'} className={'ms-1'}> {dataSet.sostanza}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <TableContainer className={'mt-2'}>
          <Table size="small" >
            <TableBody >
              {[
                ['In', dataSet.in.toFixed(2)],
                ["Limite", dataSet.out.toFixed(2)],
                ["%/E", percTrue]
              ].map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontSize: '10px' }} align={'center'}>{key}</TableCell>
                  <TableCell sx={{ fontSize: '10px' }} align={'center'}>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardActions>

    </Card>
  );
};

