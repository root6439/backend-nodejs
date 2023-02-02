import { CustomerRepository } from "./../typeorm/repositories/CustomerRepository";
import { Customer } from "./../typeorm/entities/Customer";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class GetCustomerById {
  public async execute(id: string): Promise<Customer> {
    const customerRepo = getCustomRepository(CustomerRepository);

    const customer = await customerRepo.findById(id);

    if (!customer) {
      throw new AppError("Cliente não encontrado.");
    }

    return customer;
  }
}
