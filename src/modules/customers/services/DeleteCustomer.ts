import { AppError } from "./../../../shared/errors/AppError";
import { CustomerRepository } from "./../typeorm/repositories/CustomerRepository";
import { getCustomRepository } from "typeorm";

export class DeleteCustomer {
  public async execute(id: string): Promise<void> {
    const customerRepo = getCustomRepository(CustomerRepository);

    const customer = await customerRepo.findById(id);

    if (!customer) {
      throw new AppError("Usuário não encontrado.");
    }

    await customerRepo.remove(customer);
  }
}
