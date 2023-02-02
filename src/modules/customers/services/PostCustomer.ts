import { Customer } from "./../typeorm/entities/Customer";
import { CustomerRepository } from "./../typeorm/repositories/CustomerRepository";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class PostCustomer {
  public async execute(name: string, email: string): Promise<Customer> {
    const customerRepo = getCustomRepository(CustomerRepository);

    const emailExists = await customerRepo.findByEmail(email);

    if (emailExists) {
      throw new AppError("E-mail já está em uso.");
    }

    const customer = customerRepo.create({
      name,
      email,
    });

    await customerRepo.save(customer);

    return customer;
  }
}
