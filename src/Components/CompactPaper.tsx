import React, {ChangeEvent, useState} from 'react';
import {PaperValue} from './PaperValue';
import {Grid} from '@mui/material';
import Btn from './Btn';

type CompactPaperTypeProps = {
    maxValue: number
    minValue: number
    error: boolean
    value: number
    onClickIncHandler: () => void
    onClickResetHandler: () => void
    onClickSetHandler: () => void
    onChangeMinValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeMaxValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
export const CompactPaper = ({
                                 maxValue,
                                 minValue,
                                 value,
                                 error,
                                 onClickIncHandler,
                                 onClickResetHandler,
                                 onClickSetHandler,
                                 onChangeMinValueHandler,
                                 onChangeMaxValueHandler
                             }: CompactPaperTypeProps) => {

    const [mode, setMode] = useState(false)


    const onClickSetModeHandler = () => {
        setMode(true)
    }

    const onClickSetModeReturnHandler = () => {
        onClickSetHandler()
        setMode(false)
    }

    return <>
        {mode
            ? <PaperValue maxValue={maxValue} minValue={minValue} error={error}
                          onChangeMinValueHandler={onChangeMinValueHandler}
                          onChangeMaxValueHandler={onChangeMaxValueHandler}
                          onClickSetHandler={onClickSetModeReturnHandler}/>
            : <>
                <Grid item xs={12} textAlign={'center'} height={'130px'} paddingTop={'30px'}>

                    {error
                        ? (minValue < 0 || maxValue <= minValue ? <div>incorrect value</div> :
                            <div>enter values and press 'set'</div>)  // error or warning
                        : (value === maxValue ? <div className={'maxValue'}>{value}</div> : <div
                            className={'value'}>{value}</div>)}

                </Grid>

                {/*Inc Button*/}
                <Grid item xs={4} textAlign={'center'}>
                    <Btn onClick={onClickIncHandler} disabled={error || value === maxValue} name={'inc'}/>
                </Grid>

                {/*Reset Button*/}
                <Grid item xs={4} textAlign={'center'}>
                    <Btn onClick={onClickResetHandler} disabled={error || value === minValue}
                         name={'reset'}/>
                </Grid>
                <Grid item xs={4} textAlign={'center'}>
                    <Btn onClick={onClickSetModeHandler} name={'set'}
                    />
                </Grid>
            </>

        }


    </>
}