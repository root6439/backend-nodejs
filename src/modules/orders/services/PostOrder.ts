import { getCustomRepository } from "typeorm";
import { AppError } from "../../../shared/errors/AppError";
import { CustomerRepository } from "../../customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "../../products/typeorm/repositories/ProductRepository";
import { Order } from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

export class PostOrder {
  public async execute(
    customer_id: string,
    products: IProduct[]
  ): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Cliente não encontrado.");
    }

    const existsProducts = await productsRepository.findByIds(
      products.map((p) => p.id)
    );

    if (existsProducts.length == 0) {
      throw new AppError("Não foi possível encontrar os produtos.");
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    console.log(existsProductsIds);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );
    console.log(checkInexistentProducts);

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Não foi possível encontrar o produto ${checkInexistentProducts[0].id}.`
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        existsProducts.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `A quantidade ${quantityAvailable[0].quantity}
         não está disponível para ${quantityAvailable[0].id}.`
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder(
      customerExists,
      serializedProducts
    );

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        existsProducts.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
