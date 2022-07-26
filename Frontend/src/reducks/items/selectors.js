import {createSelector} from "reselect";

const itemSelector=(state)=>state.items;

export const getItems=createSelector(
    [itemSelector],
    state=>state.list 
);
