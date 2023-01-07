import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {counterReducer} from './reducers/counterReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {loadState, saveState} from '../utils/localstorage-utils';

const rootReducer = combineReducers({
    counter: counterReducer
})


export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunk))


store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    });
});



export type AppStateType = ReturnType<typeof rootReducer>

type DispatchType = ThunkDispatch<AppStateType, unknown, any>

export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


// @ts-ignore
window.store = store