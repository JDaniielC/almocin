import { OrderState, OrderStateAction, OrderStateType } from "./types";

const OrderStateReducer = (state: OrderState, action: OrderStateAction) => {
  switch (action.type) {
    case OrderStateType.CREATE:
      return {
        ...state,
        createOrderRequestStatus: action.payload,
      };
    case OrderStateType.GET_ALL:
      return {
        ...state,
        getOrdersRequestStatus: action.payload,
      };
    case OrderStateType.UPDATE:
      return {
        ...state,
        updateOrderRequestStatus: action.payload,
      };
    case OrderStateType.ADD_TO_CHART:
      return {
        ...state,
        addToChartRequestStatus: action.payload,
      };
    case OrderStateType.GET_BY_USER:
      return {
        ...state,
        getOrdersByUserRequestStatus: action.payload
      };
    case OrderStateType.GET_DELIVERY_TIME:
      return {
        ...state,
        getDeliveryTimeRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default OrderStateReducer;
