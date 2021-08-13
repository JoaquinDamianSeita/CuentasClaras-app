import { combineReducers } from "redux";
import posts from "./postsReducer";
import post from "./postReducer";
import operations from "./operationsReducer";
import operation from "./operationReducer";

export default combineReducers({
    posts: posts,
    post: post,

    operation:operation,
    operations:operations
});