import { createContext, useReducer, useMemo} from "react";
import RegisterService from "./service";
import registerStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import { RegisterContextProps, RegisterProviderProps } from "./types";
import RequestStatus from "../../../../shared/types/request-status";

// Criação do contexto com um valor padrão vazio
export const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const [state, dispatch] = useReducer(registerStateReducer, {
    registerRequestStatus: RequestStatus.idle(),
  });

  // Criação do serviço de API com o useMemo
  const apiService = useMemo(() => new ApiService({}), []);
  const service = useMemo(() => new RegisterService({ apiService, dispatch }), [apiService, dispatch]);

  // Garantir que o contexto é fornecido com valores não indefinidos
  const contextValue = useMemo(
    () => ({
      state,
      service,
    }),
    [state, service]
  );

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};
