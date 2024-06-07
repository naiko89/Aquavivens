import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { Grid, TextField, Button } from '@mui/material';

let DateIntervalForm = (data) => {
    const [startDate, setStartDate] = useState(dayjs('2023-11-20'));
    const [endDate, setEndDate] = useState(dayjs('2023-11-30'));

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        data.setData(startDate, endDate)
        data.setCurrentDateBol(true)
        data.runGenerated()
        //console.log('dovresti aver risalito l albero') console.log('Data di Inizio:', startDate);console.log('Data di Fine:', endDate);
    };

    return (
        <form onSubmit={handleSubmit} style={{paddingTop:'10px'}}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <div style={{ flex: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                value={startDate}
                                minDate={dayjs('2022-04-01')}
                                maxDate={dayjs('2024-01-01')}
                                size="small"
                                onChange={handleStartDateChange}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div style={{ flex: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                value={endDate}
                                minDate={dayjs('2022-04-01')}
                                maxDate={dayjs('2024-01-01')}
                                size="small"
                                onChange={handleEndDateChange}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>

                <Grid item xs={2} style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', height:'100%' }}>
                        Invia
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default DateIntervalForm;


