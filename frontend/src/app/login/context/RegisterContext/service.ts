import { Dispatch } from "react";
import { RegisterAction, RegisterActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { RegisterFormType } from "../../forms/RegisterForm";
import { Result } from "../../../../shared/types/result"; // Certifique-se de importar os tipos corretamente

class RegisterService {
  private apiService: ApiService;
  private dispatch: Dispatch<RegisterAction>;

  constructor({ apiService, dispatch }: { apiService: ApiService; dispatch: Dispatch<RegisterAction>; }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async register(data: RegisterFormType) {
    this.dispatch({ type: RegisterActionType.REGISTER, payload: RequestStatus.loading() });
    try {
      const result: Result<any> = await this.apiService.post("/register", data);

      result.handle({
        onSuccess: (data) => {
          this.dispatch({ type: RegisterActionType.REGISTER, payload: RequestStatus.success(data) });
        },
        onFailure: (error) => {
          this.dispatch({ type: RegisterActionType.REGISTER, payload: RequestStatus.failure(error) });
        }
      });
    } catch (error) {
      // Assumindo que o erro também deve ser tratado pelo RequestStatus
      this.dispatch({ type: RegisterActionType.REGISTER, payload: RequestStatus.failure(error) });
    }
  }
}

export default RegisterService;
