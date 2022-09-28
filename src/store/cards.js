import { createSlice } from "@reduxjs/toolkit";
import {createSelector} from 'reselect';
import { v4 as uuid } from "uuid";

const slice = createSlice({
    name: "cards",
    initialState: [ {
        id: '1',
        title: 'Nueva lista',
        items: []
      },
      {
        id: '2',
        title: 'Nueva lista',
        items: []
      }],
    reducers:{
        cardAdded: (cards, action)=>{
            cards.push({
                id: uuid(),
                title: "Nueva lista",
                items: []
            });
        },
        cardTitleChanged: (cards, action)=>{
           const index = cards.findIndex(card => card.id === action.payload.id);
           console.log("card",cards[index]);
           cards[index].title = action.payload.title;
        }
    }
})

export const {cardAdded, cardTitleChanged} = slice.actions;
export default slice.reducer;


//selectores
export const getCardsById= id => createSelector(
    state => state.cards,
    cards => cards.filter(card=>card.id === id)
);
