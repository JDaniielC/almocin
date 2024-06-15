import BaseEntity from "./base.entity";

export default class OrderEntity extends BaseEntity {
  items: string[];
  userID: string;
  totalPrice: number;
  pedidoId: string;
  status:string;
  totalDeliveryTime: number;
  cep: string;
  address_number: number;

  constructor(data: OrderEntity) {
    super(data.id || '');
    this.items = data.items;
    this.userID = data.userID;
    this.totalPrice = data.totalPrice;
    this.pedidoId = data.pedidoId;
    this.status = data.status;
    this.totalDeliveryTime = data.totalDeliveryTime;
    this.cep = data.cep;
    this.address_number = data.address_number;
  }
}