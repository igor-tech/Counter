import React, {ChangeEvent, FC} from 'react';
import {Grid, TextField} from '@mui/material';
import Btn from './Btn';
import {useAppSelector} from '../bll/store';

interface IPaperValueTypeProps  {
    onChangeMinValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeMaxValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onClickSetHandler: () => void
}
export const PaperValue:FC<IPaperValueTypeProps> = ({onChangeMinValueHandler, onChangeMaxValueHandler, onClickSetHandler,}) => {
    const {minValue, maxValue, error} = useAppSelector(state => state.counter)
    return <>
        <Grid item xs={12} textAlign={'center'} padding={'0 40px 0 40px'}>
            <div>Start value</div>
            <div>
                <TextField variant="outlined"
                           color={'info'}
                           focused
                           error={maxValue <= minValue || minValue < 0} size={'small'}
                           fullWidth
                           type={'number'}
                           onChange={onChangeMinValueHandler}
                           value={minValue}
                />
            </div>
        </Grid>
        <Grid item xs={12} textAlign={'center'} padding={'0 40px 0 40px'}>
            <div>Max value</div>
            <div>
                <TextField variant="outlined"
                           color={'info'}
                           focused
                           error={maxValue <= minValue || maxValue <= 0}
                           size={'small'}
                           fullWidth
                           type={'number'}
                           value={maxValue}
                           onChange={onChangeMaxValueHandler}
                />
            </div>
        </Grid>
        <Grid item xs={12} paddingTop={'5px'} textAlign={'center'}>
            <Btn onClick={onClickSetHandler}
                 name={'set'}
                 disabled={!error || minValue < 0 || maxValue <= minValue}
            />
        </Grid>
    </>
}