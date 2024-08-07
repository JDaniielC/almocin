import { createContext, useReducer, useMemo } from "react";
import UserService from "./service";
import userStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { UserContextProps, UserProviderProps } from "./types";

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userStateReducer, {
    createUserRequestStatus: RequestStatus.idle(),
    updateUserRequestStatus: RequestStatus.idle(),
    deleteUserRequestStatus: RequestStatus.idle(),
    getUserRequestStatus: RequestStatus.idle(),
    getUsersRequestStatus: RequestStatus.idle(),
    loginRequestStatus: RequestStatus.idle(),
    logoutRequestStatus: RequestStatus.idle(),
    resetPasswordRequestStatus: RequestStatus.idle(),
    userId: localStorage.getItem("userId"),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new UserService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <UserContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};