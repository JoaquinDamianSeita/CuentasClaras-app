import { combineReducers } from "redux";
import operations from "./operationsReducer";
import operation from "./operationReducer";

export default combineReducers({
    operation:operation,
    operations:operations
});