import { SET_POST } from "../actions";

export default function postReducer(state = {},action){
    switch(action.type){
        case SET_POST:
            return action.post;
        default:
            return state;
    }
}