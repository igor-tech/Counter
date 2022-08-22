import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import './App.css';
import Btn from './Components/Btn';
import {Box, Container, Grid, Paper, TextField} from '@mui/material';

function App() {

    let maxValueCounter = 5;
    let minValueCounter = 0;

    const [value, setValue] = useState(minValueCounter);
    const [minValue, setMinValue] = useState(minValueCounter);
    const [maxValue, setMaxValue] = useState(maxValueCounter);
    const [error, setError] = useState<boolean>(true)


    useEffect(() => {
        let newMinValue = localStorage.getItem('minValue')
        if (newMinValue) {
            let minValue = JSON.parse(newMinValue)
            setMinValue(minValue)
            setValue(minValue)
        }
        let newMaxValue = localStorage.getItem('maxValue')
        if (newMaxValue) {
            let maxValue = JSON.parse(newMaxValue)
            setMaxValue(maxValue)
        }

    }, [])
    useEffect(() => {
        localStorage.setItem('minValue', JSON.stringify(minValue))
    }, [minValue])
    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])


    const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMinValue(+(e.currentTarget.value))
        setError(true)
    }
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+(e.currentTarget.value))
        setError(true)
    }

    const onClickSetHandler = () => {
        setValue(minValue)
        maxValueCounter = maxValue;
        minValueCounter = minValue;
        setError(false)
    }
    const onClickResetHandler = () => {
        setValue(minValue)
    }
    const onClickIncHandler = () => {
        setValue(value + 1)
    }


    return (
        <Container fixed>
            <Grid container spacing={2} columns={16} paddingTop={'40px'}>

                {/*Title*/}
                <Grid item xs={16}>
                    <Paper elevation={4}>
                        <div className={'counter'}>Counter</div>
                    </Paper>
                </Grid>

                {/*Set Paper*/}
                <Grid item xs={8}>
                    <Paper elevation={4}>
                        <Grid container padding={'10px'}>

                            {/*Input start value*/}
                            <Grid item xs={12}>
                                <div>Start value</div>
                                <div>
                                    <TextField variant="outlined" color={'info'} focused
                                               error={maxValue <= minValue || minValue < 0} size={'small'}
                                               type={'number'} onChange={onChangeMinValueHandler} value={minValue}/>
                                </div>
                            </Grid>
                            {/*Input max value*/}
                            <Grid item xs={12}>
                                <div>Max value</div>
                                <div>
                                    <TextField variant="outlined" color={'info'} focused
                                               error={maxValue <= minValue || maxValue <= 0} size={'small'}
                                               type={'number'} value={maxValue} onChange={onChangeMaxValueHandler}/>
                                </div>
                            </Grid>
                            {/*// Set button*/}
                            <Grid item xs={12} paddingTop={'5px'}>
                                <Btn onClick={onClickSetHandler} name={'set'}
                                     disabled={!error || minValue < 0 || maxValue <= minValue}/>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>


                {/*Inc and Reset Paper*/}
                <Grid item xs={8}>
                    <Paper elevation={4}>
                        <Grid container minHeight={'178px'}>


                            {/* display*/}
                            <Grid item xs={12} textAlign={'center'} height={'130px'} paddingTop={'30px'}>

                                {error

                                    ? (minValue < 0 || maxValue <= minValue ? <div>incorrect value</div> :
                                        <div>enter values and press 'set'</div>)  // error or warning

                                    : (value === maxValue ? <div className={'maxValue'}>{value}</div> : <div
                                        className={'value'}>{value}</div>)} {/*increase in the number of max Value*/}

                            </Grid>

                            {/*Inc Button*/}
                            <Grid item xs={6} textAlign={'center'}>
                                <Btn onClick={onClickIncHandler} disabled={error || value === maxValue} name={'inc'}/>
                            </Grid>

                            {/*Reset Button*/}
                            <Grid item xs={6} textAlign={'center'}>
                                <Btn onClick={onClickResetHandler} disabled={error || value === minValue}
                                     name={'reset'}/>
                            </Grid>


                        </Grid>
                    </Paper>
                </Grid>


            </Grid>
        </Container>

    );
}

export default App;
