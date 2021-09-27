import { get } from "axios";
import { getToken } from "../auth/auth-helper";

//Acciones para los reducers

export const SET_OPERATIONS = "SET_OPERATIONS";
export const ADD_OPERATION = "ADD_OPERATION";
export const SET_OPERATION = "SET_OPERATION";
export const REMOVE_OPERATION = "REMOVE_OPERATION";
export const REPLACE_OPERATION = "REPLACE_OPERATION";

export function setOperations() {
  const userToken = getToken();
  return function (dispatch) {
    return get(`/api/operations/allOperations`, {
      headers: {
        Authorization: userToken,
      },
    })
      .then(function (response) {
        if (response.data.error) {
          return { error: response.data.error };
        }
        dispatch({ type: SET_OPERATIONS, operations: response.data.reverse() });
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