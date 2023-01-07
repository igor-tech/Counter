import React, {ChangeEvent, FC, useState} from 'react';
import {PaperValue} from './PaperValue';
import {Grid} from '@mui/material';
import Btn from './Btn';
import {useAppSelector} from '../bll/store';

interface ICompactPaperTypeProps {
    onClickIncHandler: () => void
    onClickResetHandler: () => void
    onClickSetHandler: () => void
    onChangeMinValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeMaxValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CompactPaper: FC<ICompactPaperTypeProps> = ({onClickIncHandler, onClickResetHandler, onClickSetHandler, onChangeMinValueHandler, onChangeMaxValueHandler
}) => {
    const {value, minValue, maxValue, error} = useAppSelector(state => state.counter)
    const [mode, setMode] = useState(false)

    const onClickSetModeHandler = () => setMode(true)

    const onClickSetModeReturnHandler = () => {
        onClickSetHandler()
        setMode(false)
    }

    return (
        <>
            {mode
                ? <PaperValue
                              onChangeMinValueHandler={onChangeMinValueHandler}
                              onChangeMaxValueHandler={onChangeMaxValueHandler}
                              onClickSetHandler={onClickSetModeReturnHandler}/>
                : <>
                    <Grid item xs={12} textAlign={'center'} height={'130px'} paddingTop={'30px'}>
                        {error
                            ? (minValue < 0 || maxValue <= minValue
                                ? <div>incorrect value</div>
                                : <div>enter values and press 'set'</div>)  // error or warning
                            : (value === maxValue
                                ? <div className={'maxValue'}>{value}</div>
                                : <div className={'value'}>{value}</div>)}
                    </Grid>

                    {/*Inc Button*/}
                    <Grid item xs={4} textAlign={'center'}>
                        <Btn onClick={onClickIncHandler}
                             disabled={error || value === maxValue}
                             name={'inc'}
                        />
                    </Grid>

                    {/*Reset Button*/}
                    <Grid item xs={4} textAlign={'center'}>
                        <Btn onClick={onClickResetHandler}
                             disabled={error || value === minValue}
                             name={'reset'}
                        />
                    </Grid>

                    <Grid item xs={4} textAlign={'center'}>
                        <Btn onClick={onClickSetModeHandler}
                             name={'set'}
                        />
                    </Grid>
                </>
            }
        </>
    )
}