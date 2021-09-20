import {
  SET_OPERATIONS,
  ADD_OPERATION,
  REMOVE_OPERATION,
  REPLACE_OPERATION,
} from "../actions";

const inicialState = { operations: [] };
export default function operationsReducer(state = inicialState, action) {
  switch (action.type) {
    case SET_OPERATIONS:
      return action.operations;
    case ADD_OPERATION:
      if (state.operations < 1) {
        return [action.operation, ...state.operations];
      } else {
        return [action.operation, ...state];
      }

    case REMOVE_OPERATION:
      return state.filter((operation) => operation._id !== action._id);
    case REPLACE_OPERATION:
      return state.map((operation) => {
        if (operation._id === action.operation._id) {
          return {
            ...operation,
            monto: action.operation.monto,
            concepto: action.operation.concepto,
          };
        } else return operation;
      });
    default:
      return state;
  }
}
