export enum OrderStatus {
  inCart = "In Cart",
  inProgress = "In Progress",
  canceled = "Canceled",
  concluded = "Concluded"
}

export interface Order {
  id: string;
  itemsId: string[];
  userID: string;
  totalPrice: number;
  status: OrderStatus;
  totalDeliveryTime: number;
  cep: string;
  address_number: number;
}

