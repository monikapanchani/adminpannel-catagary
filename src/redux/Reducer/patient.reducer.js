import * as Actiontype from '../actiontype'

const inVal = {
    isLoding: false,
    patient: [],
    error: ''
}

export const PatientReducer = (state = inVal, action) => {
    console.log(state, action.payload, action.type);
    switch (action.type) {
        case Actiontype.GET_PATIENT:
            return {
                ...state,
                isLoding: false,
                patient: action.payload,
                error: ''
            }
        case Actiontype.LODING_PATIENT:
            return {
                ...state,
                isLoding: true,
                error: ''
            }
        case Actiontype.ERROR_PATIENT:
            return {
                ...state,
                isLoding: false,
                patient: [],
                error: action.payload
            }
        case Actiontype.EDIT_PATIENT:
            return {
                ...state,
                isLoding: false,
                patient: state.patient.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                }),
                error: ''
            }
        case Actiontype.DELETE_PATIENT:
            return {
                ...state,
                isLoding: false,
                patient: state.patient.filter((l) => l.id !== action.payload),
                error: ''
            }
        case Actiontype.ADD_PATIENT:
            return {
                ...state,
                isLoding: false,
                patient: (state.patient.concat(action.payload)),
                error: ''
            }
        default:
            return state
    }
}