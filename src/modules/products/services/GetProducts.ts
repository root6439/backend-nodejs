import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import { getCustomRepository } from "typeorm";

export class GetProducts {
  public async execute(): Promise<Product[]> {
    const prodRepository = getCustomRepository(ProductRepository);
    return await prodRepository.find();
  }
}
