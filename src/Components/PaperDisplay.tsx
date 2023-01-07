import {Grid} from '@mui/material';
import Btn from './Btn';
import React, {FC} from 'react';
import {useAppSelector} from '../bll/store';

interface IPaperDisplayTypeProps  {
    onClickIncHandler: () => void
    onClickResetHandler: () => void
}
export const PaperDisplay:FC<IPaperDisplayTypeProps> = ({ onClickIncHandler, onClickResetHandler}) => {

    const {value, minValue, maxValue, error} = useAppSelector(state => state.counter)
    return <>
        <Grid item xs={12} textAlign={'center'} height={'130px'} paddingTop={'30px'}>
            {error
                ? (minValue < 0 || maxValue <= minValue
                    ? <div>incorrect value</div>
                    : <div>enter values and press 'set'</div>)
                : (value === maxValue
                    ? <div className={'maxValue'}>{value}</div>
                    : <div className={'value'}>{value}</div>)
            }
        </Grid>
        {/*Inc Button*/}
        <Grid item xs={6} textAlign={'center'}>
            <Btn onClick={onClickIncHandler}
                 disabled={error || value === maxValue}
                 name={'inc'}
            />
        </Grid>
        {/*Reset Button*/}
        <Grid item xs={6} textAlign={'center'}>
            <Btn onClick={onClickResetHandler}
                 disabled={error || value === minValue}
                 name={'reset'}
            />
        </Grid>
    </>
}