import { ReactNode } from "react";
import RequestStatus from "../../../../shared/types/request-status";
import { LoginResponse } from "../../models/LoginModel";
import LoginService from "./service"

export interface LoginState {
  loginRequestStatus: RequestStatus<LoginResponse | void>; 
  authStatusRequestStatus: RequestStatus<LoginResponse>;
}

export type LoginStateAction =
  | {
      type: LoginStateType.LOGIN;
      payload: RequestStatus<LoginResponse | void>;
    }
  | {
      type: LoginStateType.LOGOUT;
      payload: RequestStatus<void>; //
    }
  | {
      type: LoginStateType.AUTH_STATUS;
      payload: RequestStatus<LoginResponse>;
    };

export enum LoginStateType {
  LOGIN = "CHANGE_LOGIN_REQUEST_STATUS",
  LOGOUT = "CHANGE_LOGOUT_REQUEST_STATUS",
  AUTH_STATUS = "CHANGE_AUTH_STATUS_REQUEST_STATUS",
}

export interface LoginProviderProps {
  children: ReactNode;
}

export interface LoginContextProps {
  state: LoginState;
  prevState?: LoginState;
  service: LoginService; // Supondo que LoginService exista
}
