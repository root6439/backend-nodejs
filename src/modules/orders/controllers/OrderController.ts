import { PostOrder } from "./../services/PostOrder";
import { Order } from "./../typeorm/entities/Order";
import { GetOrderById } from "./../services/GetOrderById";
import { Request, Response } from "express";

export class OrderController {
  public async getById(req: Request, res: Response): Promise<Response<Order>> {
    const id = req.params.id;
    const service = new GetOrderById();
    const obj = await service.execute(id);
    return res.json(obj);
  }

  public async post(req: Request, res: Response): Promise<Response<Order>> {
    const { customer_id, products } = req.body;
    const service = new PostOrder();
    const obj = await service.execute(customer_id, products);
    return res.status(201).json(obj);
  }
}
