import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import OrderService from '../services/order.service';

class OrderController {
  private prefix: string = '/order';
  public router: Router;
  private orderService: OrderService;

  constructor(router: Router, orderService: OrderService) {
    this.router = router;
    this.orderService = orderService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getOrder(req, res)
    );
  }

  private async getOrder(req: Request, res: Response) {
    const menu = await this.orderService.getOrders();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: menu,
    }).handle(res);
  }

}

export default OrderController;
