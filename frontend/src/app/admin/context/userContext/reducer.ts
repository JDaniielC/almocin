import { UserState, UserStateAction, UserStateType } from "./types";

const userStateReducer = (state: UserState, action: UserStateAction) => {
  switch (action.type) {
    case UserStateType.CREATE:
      return {
        ...state,
        createUserRequestStatus: action.payload,
      };
    case UserStateType.GET:
      return {
        ...state,
        getUserRequestStatus: action.payload,
      };
    case UserStateType.GET_ALL:
      return {
        ...state,
        getUsersRequestStatus: action.payload,
      };
    case UserStateType.UPDATE:
      return {
        ...state,
        updateUserRequestStatus: action.payload,
      };
    case UserStateType.DELETE:
      return {
        ...state,
        deleteUserRequestStatus: action.payload
      }
    case UserStateType.LOGIN:
      return {
        ...state,
        loginRequestStatus: action.payload
      }
    case UserStateType.LOGOUT:
      return {
        ...state,
        logoutRequestStatus: action.payload
      }
    case UserStateType.RESET_PASSWORD:
      return {
        ...state,
        resetPasswordRequestStatus: action.payload
      }
    case UserStateType.USER_ID:
      return {
        ...state,
        userId: action.payload ?? localStorage.getItem('userId')
      }

    default:
      return state;
  }
};

export default userStateReducer;