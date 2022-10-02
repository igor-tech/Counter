import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {PaperValue} from './Components/PaperValue';
import {PaperDisplay} from './Components/PaperDisplay';
import {Container, FormControlLabel, FormGroup, Grid, Paper} from '@mui/material';
import Switch from '@mui/material/Switch';
import {CompactPaper} from './Components/CompactPaper';


function App() {

    let maxValueCounter = 5;
    let minValueCounter = 0;

    const [value, setValue] = useState(minValueCounter);
    const [minValue, setMinValue] = useState(minValueCounter);
    const [maxValue, setMaxValue] = useState(maxValueCounter);
    const [error, setError] = useState<boolean>(true)
    const [compact, setCompact] = useState(false)



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
        <Container fixed >
            <Grid container spacing={2} columns={16} paddingTop={'40px'}>
                {/*Title*/}
                <Grid item xs={16}>
                    <Paper elevation={4}>
                        <FormGroup>
                            <Container>
                                <Grid container columns={16}>
                                    <Grid item xs={7}>
                                        <FormControlLabel className={'switch'} control={<Switch checked={compact} onChange={() => setCompact(!compact)}/>} label="compact"/>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <div className={'counter'}>Counter</div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </FormGroup>
                    </Paper>
                </Grid>


                {
                    compact
                        ? <Grid item xs={8} marginLeft={'25%'}>
                            <Paper elevation={4}>
                                <Grid container minHeight={'178px'}>
                                    <CompactPaper error={error}
                                                  minValue={minValue}
                                                  maxValue={maxValue}
                                                  value={value}
                                                  onClickIncHandler={onClickIncHandler}
                                                  onClickResetHandler={onClickResetHandler}
                                                  onClickSetHandler={onClickSetHandler}
                                                  onChangeMinValueHandler={onChangeMinValueHandler}
                                                  onChangeMaxValueHandler={onChangeMaxValueHandler}
                                    />
                                </Grid>
                            </Paper>
                        </Grid>


                        : <>
                            {/*Paper Set*/}
                            <Grid item xs={8}>
                                <Paper elevation={4}>
                                    <Grid container padding={'10px'}>
                                        <PaperValue maxValue={maxValue}
                                                    minValue={minValue}
                                                    error={error}
                                                    onChangeMaxValueHandler={onChangeMaxValueHandler}
                                                    onChangeMinValueHandler={onChangeMinValueHandler}
                                                    onClickSetHandler={onClickSetHandler}
                                        />
                                    </Grid>
                                </Paper>
                            </Grid>
                            {/*Display Paper*/}
                            <Grid item xs={8}>
                                <Paper elevation={4}>
                                    <Grid container minHeight={'178px'}>
                                        <PaperDisplay error={error}
                                                      minValue={minValue}
                                                      maxValue={maxValue}
                                                      value={value}
                                                      onClickIncHandler={onClickIncHandler}
                                                      onClickResetHandler={onClickResetHandler}
                                        />
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                }

            </Grid>
        </Container>

    );
}

export default App;

