import { Customer } from "./../../../customers/typeorm/entities/Customer";
import { Order } from "./../entities/Order";
import { EntityRepository, Repository } from "typeorm";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    return await this.findOne(id, {
      relations: ["order_products", "customer"],
    });
  }

  public async createOrder(
    customer: Customer,
    products: IProduct[]
  ): Promise<Order> {
    const order = this.create({
      customer: customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
