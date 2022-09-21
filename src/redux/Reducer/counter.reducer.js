import * as Actiontype from '../actiontype';

const iniVal = {
    counter: 0
}

export const counterReducer = (state = iniVal, action) => {
    switch (action.type) {
        case Actiontype.INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case Actiontype.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state;
    }
}