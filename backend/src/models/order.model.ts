import ItemMenuEntity from '../entities/item-menu.entity';
import BaseModel from './base.model';

export default class OrderModel extends BaseModel {
  items: ItemMenuEntity[];
  userID: string;
  totalPrice: number;
  pedidoId: string;
  status:string;
  totalDeliveryTime: number;
  cep: string;
  address_number: number;

  constructor(data: OrderModel) {
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
