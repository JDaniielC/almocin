import { LoginState, LoginStateAction, LoginStateType } from "./types";


const loginStateReducer = (state: LoginState, action: LoginStateAction): LoginState => {
  switch (action.type) {
    case LoginStateType.LOGIN:
      return {
        ...state,
        loginRequestStatus: action.payload, 
      };
    case LoginStateType.LOGOUT:
      return {
        ...state,
        loginRequestStatus: action.payload, 
      };
    case LoginStateType.AUTH_STATUS:
      return {
        ...state,
        authStatusRequestStatus: action.payload, 
      };
    default:
      return state;
  }
};

export default loginStateReducer;
