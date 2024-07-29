import RequestStatus from "../../../../shared/types/request-status";
import { ReactNode } from "react";
import OrderService from "./service";
import { Order } from "../../../../shared/types/order";

export type OrderStateAction =
  | {
      type: OrderStateType.CREATE;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.GET_ALL;
      payload: RequestStatus<Order[]>;
    }
  | {
      type: OrderStateType.UPDATE;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.ADD_TO_CHART;
      payload: RequestStatus<string>;
    };

export interface OrderState {
  createOrderRequestStatus: RequestStatus<string>;
  updateOrderRequestStatus: RequestStatus<string>;
  addToChartRequestStatus: RequestStatus<string>;
  getOrdersRequestStatus: RequestStatus<Order[]>;
}

export enum OrderStateType {
  ADD_TO_CHART = "CHANGE_ADD_TO_CHART_REQUEST_STATUS",
  CREATE = "CHANGE_CREATE_ORDER_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_ORDER_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_ORDERS_REQUEST_STATUS",
}

export interface OrderProviderProps {
  children: ReactNode;
}

export interface OrderContextProps {
  state: OrderState;
  prevState?: OrderState;
  service: OrderService;
}
