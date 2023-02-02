import { Order } from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class GetOrderById {
  public async execute(id: string): Promise<Order> {
    const orderRepo = getCustomRepository(OrdersRepository);

    const order = await orderRepo.findById(id);

    if (!order) {
      throw new AppError("Compra não encontrada.");
    }

    return order;
  }
}
