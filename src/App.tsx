import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import {PaperValue} from './Components/PaperValue';
import {PaperDisplay} from './Components/PaperDisplay';
import {Container, FormControlLabel, FormGroup, Grid, Paper} from '@mui/material';
import Switch from '@mui/material/Switch';
import {CompactPaper} from './Components/CompactPaper';
import {useAppDispatch, useAppSelector} from './bll/store';
import {setCompactAC, setErrorAC, setMaxValueAC, setMinValueAC, setValueAC} from './bll/reducers/counterReducer';


function App() {
    const {value, minValue, maxValue, compact} = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setErrorAC(true))
        dispatch(setValueAC(minValue))
    }, [])


    const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinValueAC(+(e.currentTarget.value)))
        dispatch(setErrorAC(true))
    }
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setErrorAC(true))
        dispatch(setMaxValueAC(+(e.currentTarget.value)))
    }

    const onClickSetHandler = () => {
        dispatch(setErrorAC(false))
        // dispatch(setMinValueTC())
        // dispatch(setMaxValueTC())
    }
    const onClickResetHandler = () => {
        dispatch(setValueAC(minValue))
    }
    const onClickIncHandler = () => {
        const action = value + 1
        dispatch(setValueAC(action))
    }


    return (
        <Container fixed>
            <Grid container spacing={2} columns={16} paddingTop={'40px'}>
                {/*Title*/}
                <Grid item xs={16}>
                    <Paper elevation={4}>
                        <FormGroup>
                            <Container>
                                <Grid container columns={16}>
                                    <Grid item xs={7}>
                                        <FormControlLabel className={'switch'}
                                                          control={<Switch
                                                              checked={compact}
                                                              onChange={() => dispatch(setCompactAC(!compact))}
                                                          />}
                                                          label="compact"/>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <div className={'counter'}>Counter</div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </FormGroup>
                    </Paper>
                </Grid>

                {compact
                    ? (<Grid item xs={8} marginLeft={'25%'}>
                        <Paper elevation={4}>
                            <Grid container minHeight={'178px'}>
                                <CompactPaper
                                    onClickIncHandler={onClickIncHandler}
                                    onClickResetHandler={onClickResetHandler}
                                    onClickSetHandler={onClickSetHandler}
                                    onChangeMinValueHandler={onChangeMinValueHandler}
                                    onChangeMaxValueHandler={onChangeMaxValueHandler}
                                />
                            </Grid>
                        </Paper>
                    </Grid>)


                    : (<>
                        {/*Paper Set*/}
                        <Grid item xs={8}>
                            <Paper elevation={4}>
                                <Grid container padding={'10px'}>
                                    <PaperValue
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
                                    <PaperDisplay
                                        onClickIncHandler={onClickIncHandler}
                                        onClickResetHandler={onClickResetHandler}
                                    />
                                </Grid>
                            </Paper>
                        </Grid>
                    </>)}
            </Grid>
        </Container>

    );
}

export default App;

