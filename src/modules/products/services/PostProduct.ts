import { Product } from "../typeorm/entities/Product";
import { AppError } from "../../../shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import { getCustomRepository } from "typeorm";
import { IRequest } from "../../../shared/models/request/product/ProductRequest";

export class PostProduct {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const prodRepository = getCustomRepository(ProductRepository);

    const prodExists = await prodRepository.findByName(name);

    if (prodExists) {
      throw new AppError("Já existe um produto com o mesmo nome.");
    }

    const prod = prodRepository.create({
      name,
      price,
      quantity,
    });

    await prodRepository.save(prod);

    return prod;
  }
}
