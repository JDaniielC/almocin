import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';

class OrderService {
  private OrderRepository: OrderRepository;
  private menuRepository: MenuRepository;

  constructor(
    orderRepository: OrderRepository,
    menuRepository: MenuRepository,
  ) {
    this.OrderRepository = orderRepository;
    this.menuRepository = menuRepository;
  }

  public async getOrders(): Promise<OrderModel[]> {
    const entity = await this.OrderRepository.getOrders();
    const menu = await this.menuRepository.getItems();
    const model = entity.map((item) => new OrderModel({
      ...item,
      items: menu.filter((i) => i.categoryID === item.id),
    }));
    return model;
  }

}

export default OrderService;
