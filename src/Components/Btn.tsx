import React from 'react';
import {Button} from '@mui/material';

type BtnPropsType = {
    onClick: () => void
    disabled?: boolean
    name: string
}


const Btn = (props: BtnPropsType) => {
    return (
        <div>
            <Button onClick={props.onClick}
                    disabled={props.disabled}
                    variant="contained"
                    color={'primary'}
                    size={'small'}
            >{props.name}</Button>
        </div>
    );
};

export default Btn;
