import { Dispatch } from "react";
import { LoginStateAction, LoginStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { LoginResponse } from "../../models/LoginModel";

export default class LoginService {
  private apiService: ApiService;
  private dispatch: Dispatch<LoginStateAction>;
  private prefix = "/login";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<LoginStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async login(credentials: { username: string; password: string }): Promise<void> {
    this.dispatch({
      type: LoginStateType.LOGIN,
      payload: RequestStatus.loading(),
    });


    const result = await this.apiService.post(this.prefix, credentials);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data as LoginResponse;
        this.dispatch({
          type: LoginStateType.LOGIN,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateType.LOGIN,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async checkAuthStatus(): Promise<void> {
    this.dispatch({
      type: LoginStateType.AUTH_STATUS,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/status`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data as LoginResponse;
        this.dispatch({
          type: LoginStateType.AUTH_STATUS,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateType.AUTH_STATUS,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async logout(): Promise<void> {
    this.dispatch({
      type: LoginStateType.LOGOUT,
      payload: RequestStatus.loading(),
    });

    // Correção: forneça tanto a URL quanto o corpo da requisição
    const result = await this.apiService.post(`${this.prefix}/logout`, {});

    result.handle({
      onSuccess: () => {
        this.dispatch({
          type: LoginStateType.LOGOUT,
          payload: RequestStatus.success(undefined),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateType.LOGOUT,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
