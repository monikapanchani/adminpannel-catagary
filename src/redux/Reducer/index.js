import { combineReducers } from "redux"
import { catagory } from "../Action/catagory.action"
import { catagoryreducer } from "./catagory.reducer"


export const RootReducer = combineReducers({
    catagory : catagoryreducer,
})