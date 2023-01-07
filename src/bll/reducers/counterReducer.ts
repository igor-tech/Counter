import {Dispatch} from 'redux';
import {AppStateType} from '../store';

const initialState = {
    value: 0,
    minValue: 0,
    maxValue: 5,
    error: true,
    compact: false

}


export const counterReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SET-VALUE':
            return {...state, value: action.value}
        case 'SET-MAX-VALUE':
            return {...state, maxValue: action.maxValue}
        case 'SET-MIN-VALUE':
            return {...state, minValue: action.minValue}
        case 'SET-COMPACT':
            return {...state, compact: action.isCompact}
        case 'SET-ERROR':
            return {...state, error: action.Error}
        default:
            return state
    }
}

//actions creators
export const setValueAC = (value: number) => ({type: 'SET-VALUE', value} as const)
export const setMinValueAC = (minValue: number) => ({type: 'SET-MIN-VALUE', minValue} as const)
export const setMaxValueAC = (maxValue: number) => ({type: 'SET-MAX-VALUE', maxValue} as const)
export const setCompactAC = (isCompact: boolean) => ({type: 'SET-COMPACT', isCompact} as const)
export const setErrorAC = (Error: boolean) => ({type: 'SET-ERROR', Error} as const)


//types
type ActionsTypes =
    | ReturnType<typeof setValueAC>
    | ReturnType<typeof setMinValueAC>
    | ReturnType<typeof setMaxValueAC>
    | ReturnType<typeof setCompactAC>
    | ReturnType<typeof setErrorAC>

type initialStateType = typeof initialState


//thunks
