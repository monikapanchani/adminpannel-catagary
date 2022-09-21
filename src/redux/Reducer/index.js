import { combineReducers } from "redux"
import { Medicine } from "../Action/medicine.action"
import { counterReducer } from "./counter.reducer"
import { medicinereducer } from "./medicine.reducer"
import { PatientReducer } from "./patient.reducer"


export const RootReducer = combineReducers({
    counter : counterReducer,
    medicine : medicinereducer,
    patient : PatientReducer
})