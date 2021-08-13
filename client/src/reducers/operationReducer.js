import { SET_OPERATION } from "../actions";

export default function operationReducer(state = {},action){
    switch(action.type){
        case SET_OPERATION:
            return action.operation;
        default:
            return state;
    }
}