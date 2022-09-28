import { createSlice } from "@reduxjs/toolkit";
import {createSelector} from 'reselect';
import { v4 as uuid } from "uuid";

const slice = createSlice({
    name: "cards",
    initialState: [],
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
           cards[index].title = action.payload.title;
        },
        itemAdded: (cards, action)=>{
            const index = cards.findIndex(card => card.id === action.payload.id);
            cards[index].items.push(
                {id: uuid(),
                title:"Nueva tarjeta",
                cardId: action.payload.id,
                description: "Añada una descripción más detallada...",
            }
            )
        },
        itemTitleChanged: (cards, action)=>{
            const indexCard = cards.findIndex(card => card.id === action.payload.cardId);
            const indexItem = cards[indexCard].items.findIndex(item => item.id === action.payload.itemId);
            cards[indexCard].items[indexItem].title=action.payload.title;
        }
    }
})

export const {cardAdded, cardTitleChanged, itemAdded, itemTitleChanged} = slice.actions;
export default slice.reducer;


//selectores
export const getCardsById= id => createSelector(
    state => state.cards,
    cards => cards.filter(card=>card.id === id)
);
