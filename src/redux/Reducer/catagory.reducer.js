import * as Actiontype from '../actiontype'

const iniVal = {
    isLoding: false,
    catagory: [],
    error: ''

}

export const catagoryreducer = (state = iniVal, action) => {
    console.log(state, action.payload, action.type);
    switch (action.type) {
        case Actiontype.GET_CATAGORY:
            return {
                ...state,
                isLoding: false,
                catagory: action.payload,
                error: ''
            }
        case Actiontype.EDIT_CATAGORY:
            return {
                ...state,
                isLoding: false,
                catagory: state.catagory.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                }),
                error: ''
            }
        case Actiontype.DELETE_CATAGORY:
            return {
                ...state,
                isLoding: false,
                catagory: state.catagory.filter((l) => l.id !== action.payload),
                error: ''
            }
        case Actiontype.ADD_CATAGORY:
            return {
                ...state,
                isLoding: false,
                catagory: (state.catagory.concat(action.payload)),
                error: ''
            }
        case Actiontype.LODING_CATAGORY:
            return {
                ...state,
                isLoding: true,
                error: ''
            }
        case Actiontype.ERROR_CATAGORY:
            return {
                ...state,
                isLoding: false,
                catagory: [],
                error: action.payload
            }
        default:
            return state

    }
}