import * as Actiontype from '../actiontype'

export const increment =()=>(dispatch)=>{
    dispatch({type:Actiontype.INCREMENT_COUNTER})
}
export const decrement =()=>(dispatch)=>{
    dispatch({type:Actiontype.DECREMENT_COUNTER})
}