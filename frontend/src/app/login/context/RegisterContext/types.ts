import  RequestStatus  from "../../../../shared/types/request-status";
import RegisterService from "./service"

// Enum para os tipos de ações do registro
export enum RegisterActionType {
  REGISTER = "REGISTER",
}

// Definição das ações possíveis
export type RegisterAction =
  | {
      type: RegisterActionType.REGISTER;
      payload: RequestStatus<any, any>;
    };

// Interface para o estado de registro
export interface RegisterState {
  registerRequestStatus: RequestStatus<any, any>;
}

// Interface para o contexto de registro
export interface RegisterContextProps {
  state: RegisterState;
  service: RegisterService;
}

// Interface para as props do provider de registro
export interface RegisterProviderProps {
  children: React.ReactNode;
}
