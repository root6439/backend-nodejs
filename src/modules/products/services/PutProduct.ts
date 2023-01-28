import { AppError } from "./../../../shared/errors/AppError";
import { ProductRepository } from "./../typeorm/repositories/ProductRepository";
import { getCustomRepository } from "typeorm";
import { Product } from "./../typeorm/entities/Product";
import { IPutRequest } from "./../../../shared/models/request/product/ProductRequest";

export class PutProduct {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IPutRequest): Promise<Product> {
    const prodRepository = getCustomRepository(ProductRepository);

    const prod = await prodRepository.findOne(id);

    if (!prod) {
      throw new AppError("Produto não encontrado.", 404);
    }

    const prodExists = await prodRepository.findByName(name);

    if (prodExists && name != prod.name) {
      throw new AppError("Já existe um produto com o mesmo nome.");
    }

    prod.name = name;
    prod.price = price;
    prod.quantity = quantity;

    await prodRepository.save(prod);

    return prod;
  }
}
