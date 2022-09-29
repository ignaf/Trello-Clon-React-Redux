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
        itemDeleted:(cards,action)=>{
            const indexCard = cards.findIndex(card => card.id === action.payload.cardId);
            let items = cards[indexCard].items
            const indexItem = items.findIndex(item => item.id === action.payload.itemId);  
            cards[indexCard].items = [...items.slice(0, indexItem), ...items.slice(indexItem+1)]
        },
        itemTitleChanged: (cards, action)=>{
            const indexCard = cards.findIndex(card => card.id === action.payload.cardId);
            const indexItem = cards[indexCard].items.findIndex(item => item.id === action.payload.itemId);
            cards[indexCard].items[indexItem].title=action.payload.title;
        },
        itemDescChanged: (cards, action)=>{
            const indexCard = cards.findIndex(card => card.id === action.payload.cardId);
            const indexItem = cards[indexCard].items.findIndex(item => item.id === action.payload.itemId);
            cards[indexCard].items[indexItem].description=action.payload.description;
        },
        draggablesReordered: (cards, action) =>{
            const {source, destination, draggableId, type} = action.payload;
            if(!destination){
                return;
            }

            if(type=="columns"){
                const reorderedCards = reorder(cards, source.index, destination.index);
                return cards = reorderedCards;
            }

            if(type=="items"){
                const indexSourceCard = cards.findIndex(card => card.id === source.droppableId);
                const indexDestCard = cards.findIndex(card => card.id === destination.droppableId);
                const indexItem = cards[indexSourceCard].items.findIndex(item=>item.id == draggableId);
                if(source.droppableId !== destination.droppableId){
                    const prevSourceItems = [...cards[indexSourceCard].items];                     
                    const movingItem = cards[indexSourceCard].items[indexItem];
                    const prevDestItems = [...cards[indexDestCard].items];
                    const sourceItems = prevSourceItems.filter(i=>i.id!==draggableId);
                    const destItems = prevDestItems.concat(movingItem);

                    cards[indexSourceCard].items = [...sourceItems];
                    cards[indexDestCard].items = [...destItems];
                    return;
                }
                if(source.index === destination.index && source.droppableId === destination.droppableId){
                    return;
                }else{
                    const reorderedItems = reorder(
                        cards[indexSourceCard].items,
                        source.index,
                        destination.index
                    );
                    cards[indexSourceCard].items = [...reorderedItems];
                }
            }
        }
    }
})

const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const {cardAdded, cardTitleChanged, itemAdded, itemDeleted, itemTitleChanged, itemDescChanged, draggablesReordered} = slice.actions;
export default slice.reducer;
