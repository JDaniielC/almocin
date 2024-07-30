import { Dispatch } from "react";
import { UserStateAction, UserStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { UserFormType } from "../../forms/UserForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import RequestStatus from "../../../../shared/types/request-status";
import UserModel from "../../models/UserModel";
import { LoginFormType } from "../../../login/forms/LoginForm";
import { ForgotPasswordType } from "../../../login/forms/ForgotPasswordForm";

export default class UserService {
  private apiService: ApiService;
  private dispatch: Dispatch<UserStateAction>;
  private prefix = "/register";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<UserStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createUser(userForm: UserFormType): Promise<void> {
    this.dispatch({
      type: UserStateType.CREATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(this.prefix, userForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: UserStateType.CREATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.CREATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getUser(id: string): Promise<void> {
    this.dispatch({
      type: UserStateType.GET,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: UserStateType.GET,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.GET,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.dispatch({
      type: UserStateType.DELETE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseMsg = response.msg;
        this.dispatch({
          type: UserStateType.DELETE,
          payload: RequestStatus.success(responseMsg),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.DELETE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async updateUser(
    id: string,
    userForm: UserFormType
  ): Promise<void> {
    this.dispatch({
      type: UserStateType.UPDATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`${this.prefix}/${id}`, userForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: UserStateType.UPDATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.UPDATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getUsers(): Promise<void> {
    try {
      this.dispatch({
        type: UserStateType.GET_ALL,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(this.prefix);

      result.handle({
        onSuccess: (response) => {
          const responseData: UserModel[] = response.data

          this.dispatch({
            type: UserStateType.GET_ALL,
            payload: RequestStatus.success(responseData),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: UserStateType.GET_ALL,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: UserStateType.GET_ALL,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async login(data: LoginFormType): Promise<void> {
    this.dispatch({
      type: UserStateType.LOGIN,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(`/login`, data);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);

        this.dispatch({
          type: UserStateType.USER_ID,
          payload: responseData.userId,
        });

        this.dispatch({
          type: UserStateType.LOGIN,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.LOGIN,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async logout(): Promise<void> {
    this.dispatch({
      type: UserStateType.LOGOUT,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(`/login/logout`, {});

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        this.dispatch({
          type: UserStateType.LOGOUT,
          payload: RequestStatus.success(responseData),
        });

        this.dispatch({
          type: UserStateType.USER_ID,
          payload: null,
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.LOGOUT,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async forgotPassword(data: ForgotPasswordType): Promise<void> {
    this.dispatch({
      type: UserStateType.RESET_PASSWORD,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(`/login/forgot-password`, data);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: UserStateType.RESET_PASSWORD,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: UserStateType.RESET_PASSWORD,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}