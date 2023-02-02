import { CustomerRepository } from "./../typeorm/repositories/CustomerRepository";
import { Customer } from "./../typeorm/entities/Customer";
import { getCustomRepository } from "typeorm";

export class GetCustomers {
  public async execute(): Promise<Customer[]> {
    const userRepo = getCustomRepository(CustomerRepository);
    return await userRepo.find();
  }
}
