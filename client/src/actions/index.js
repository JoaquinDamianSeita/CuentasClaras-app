import { get } from "axios";
import { getToken } from "../auth/auth-helper";

export const SET_POSTS = "SET_POSTS";
export const ADD_POST = "ADD_POST";
export const SET_POST = "SET_POST";
export const REMOVE_POST = "REMOVE_POST";
export const REPLACE_POST = "REPLACE_POST";

export const SET_OPERATIONS = "SET_OPERATIONS";
export const ADD_OPERATION = "ADD_OPERATION";
export const SET_OPERATION = "SET_OPERATION";
export const REMOVE_OPERATION = "REMOVE_OPERATION";
export const REPLACE_OPERATION = "REPLACE_OPERATION";


//operations
export function setOperations(userId) {
  const userToken = getToken();
  return function (dispatch) {
    return get(`/api/operations/allOperations/`, {
      headers: {
        Authorization: userToken,
      },
    })
      .then(function (response) {
        dispatch({ type: SET_OPERATIONS, operations: response.data });
      })
      .catch(function (err) {
        console.log("error", err);
      });
  };
}

export function addOperation(operation) {
  return {
    type: ADD_OPERATION,
    operation: operation,
  };
}

export function setOperation(operation) {
  return {
    type: SET_OPERATION,
    operation: operation,
  };
}

export function removeOperation(_id) {
  return {
    type: REMOVE_OPERATION,
    _id: _id,
  };
}

export function replaceOperation(operation) {
  return {
    type: REPLACE_OPERATION,
    operation: operation,
  };
}

//posteos
export function setPosts() {
  return function (dispatch) {
    return get("/api/posts")
      .then(function (response) {
        dispatch({ type: SET_POSTS, posts: response.data });
      })
      .catch(function (err) {
        console.log("error", err);
      });
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post: post,
  };
}

export function setPost(post) {
  return {
    type: SET_POST,
    post: post,
  };
}

export function removePost(_id) {
  return {
    type: REMOVE_POST,
    _id: _id,
  };
}

export function replacePost(post) {
  return {
    type: REPLACE_POST,
    post: post,
  };
}
