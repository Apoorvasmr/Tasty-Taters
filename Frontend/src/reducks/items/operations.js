import { fetchItemsActions } from "./actions";
import API from "../../API";

const api=new API();
export const fetchItems=(category)=>{
    return async(dispatch)=>{
        return api.getItems(category)
            .then((items)=>{
                dispatch(fetchItemsActions(items))
            }).catch((error)=>{
                alert("Failed to Connect API:/items/")
            
            })
    }
}