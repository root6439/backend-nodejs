import { AppError } from "../../../shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";

export class GetProductById {
  public async execute(id: string): Promise<Product> {
    const prodRepository = getCustomRepository(ProductRepository);

    const prod = await prodRepository.findOne(id);

    if (!prod) {
      throw new AppError("Produto não encontrado.", 404);
    }

    return prod;
  }
}
