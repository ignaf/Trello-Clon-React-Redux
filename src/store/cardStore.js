import cardsReducer from './cards';
import { configureStore } from '@reduxjs/toolkit';
import reducer
 from './reducer';
export default function(){

    return configureStore({
        reducer: reducer,
    });


};

