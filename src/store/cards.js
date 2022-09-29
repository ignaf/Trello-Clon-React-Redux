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
        reorderx: (cards, action) =>{
            const {source, destination, draggableId, type} = action.payload;
            if(!destination){
                return;
            }
            if(type=="columns"){
                const reorderedCards = reorder(cards, source.index, destination.index);
                return cards = reorderedCards;
            }
            if(type=="items"){
                console.log("items")

                const sourceCard = getCardsById(source.droppableId);
                const destCard = getCardsById(destination.droppableId);
                const indexSameCard = cards.findIndex(card => card.id === source.droppableId);


                if(source.droppableId !== destination.droppableId){
                    // const prevSourceItems = [...sourceCard[0].items];
                    // const movingItem = prevSourceItems.filter(i=>i.id == draggableId);
                    // const prevDestItems = [...destCard[0].items];
                    // const sourceItems = prevSourceItems.filter(i=>i.id!==draggableId);
                    // const destItems = prevDestItems.concat(movingItem);
                    // return;
                    console.log("drop in different card");
                    return;

                }
                if(source.index === destination.index && source.droppableId === destination.droppableId){
                    return;
                }else{
                    const reorderedItems = reorder(
                        cards[indexSameCard].items,
                        source.index,
                        destination.index
                    );
                    cards[indexSameCard].items = [...reorderedItems];
                }
            }

        }
    }
})

export const {cardAdded, cardTitleChanged, itemAdded, itemDeleted, itemTitleChanged, itemDescChanged, reorderx} = slice.actions;
export default slice.reducer;


//selectores
export const getCardsById= id => createSelector(
    state => state.cards,
    cards => cards.filter(card=>card.id === id)
);

const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
