import { CustomerRepository } from "./../typeorm/repositories/CustomerRepository";
import { Customer } from "./../typeorm/entities/Customer";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class PutCustomer {
  public async execute(
    id: string,
    name: string,
    email: string
  ): Promise<Customer> {
    const customerRepo = getCustomRepository(CustomerRepository);

    const customer = await customerRepo.findById(id);

    if (!customer) {
      throw new AppError("Usuário não encontrado.");
    }

    const customerExist = await customerRepo.findByEmail(email);

    if (customerExist && email != customer.email) {
      throw new AppError("Já existe um cliente com o mesmo e-mail.");
    }

    customer.email = email;
    customer.name = name;

    await customerRepo.save(customer);

    return customer;
  }
}
