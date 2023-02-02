import { Customer } from "./../entities/Customer";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public async findById(id: string): Promise<Customer | undefined> {
    return await this.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        email,
      },
    });
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.findOne({ where: { name } });
  }
}
