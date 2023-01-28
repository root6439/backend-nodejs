import { AppError } from "./../../../shared/errors/AppError";
import { ProductRepository } from "./../typeorm/repositories/ProductRepository";
import { getCustomRepository } from "typeorm";

export class DeleteProduct {
  public async execute(id: string): Promise<void> {
    const prodRepository = getCustomRepository(ProductRepository);

    const prod = await prodRepository.findOne(id);

    if (!prod) {
      throw new AppError("Produto não encontrado.", 404);
    }

    await prodRepository.remove(prod);
  }
}
