import React, { createContext, useReducer, useMemo } from 'react';
import LoginService from './service';
import loginStateReducer from './reducer';
import { ApiService } from '../../../../shared/services/ApiService';
import RequestStatus from '../../../../shared/types/request-status';
import usePrevious from '../../../../shared/hooks/usePrevious';
import { LoginContextProps, LoginProviderProps } from './types';

export const LoginContext = createContext<LoginContextProps>({} as LoginContextProps);

export const LoginProvider = ({ children }: LoginProviderProps) => {
  // Estado inicial
  const [state, dispatch] = useReducer(loginStateReducer, {
    loginRequestStatus: RequestStatus.idle(),
    authStatusRequestStatus: RequestStatus.idle(),
  });

  // Obtendo o estado anterior para comparação
  const prevState = usePrevious(state);

  // Inicializando o serviço de API e o LoginService
  const apiService = useMemo(() => new ApiService({}), []); // Passando configuração padrão
  const service = useMemo(
    () => new LoginService({ apiService, dispatch }),
    [apiService]
  );

  // Fornecendo o contexto para os componentes filhos
  return (
    <LoginContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
