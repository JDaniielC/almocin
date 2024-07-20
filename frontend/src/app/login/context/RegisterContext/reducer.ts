import { RegisterState, RegisterAction, RegisterActionType } from "./types";

// Função reducer para gerenciar o estado de registro
const registerStateReducer = (state: RegisterState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case RegisterActionType.REGISTER:
      return {
        ...state,
        registerRequestStatus: action.payload, // Atualiza o estado com base no payload da ação
      };
    default:
      return state; // Retorna o estado atual se a ação não for reconhecida
  }
};

export default registerStateReducer;
