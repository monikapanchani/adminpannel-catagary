import * as Actiontype from '../actiontype'

const iniVal = {
    isLoding: false,
    medicine: [],
    error: ''

}

export const medicinereducer = (state = iniVal, action) => {
    console.log(state, action.payload, action.type);
    switch (action.type) {
        case Actiontype.GET_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicine: action.payload,
                error: ''
            }
        case Actiontype.EDIT_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicine: state.medicine.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                }),
                error: ''
            }
        case Actiontype.DELETE_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicine: state.medicine.filter((l) => l.id !== action.payload),
                error: ''
            }
        case Actiontype.ADD_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicine: (state.medicine.concat(action.payload)),
                error: ''
            }
        case Actiontype.LODING_MEDICINE:
            return {
                ...state,
                isLoding: true,
                error: ''
            }
        case Actiontype.ERROR_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicine: [],
                error: action.payload
            }
        default:
            return state

    }
}