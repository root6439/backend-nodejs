import { DeleteCustomer } from "./../services/DeleteCustomer";
import { PutCustomer } from "./../services/PutCustomer";
import { PostCustomer } from "./../services/PostCustomer";
import { GetCustomerById } from "./../services/GetCustomerById";
import { GetCustomers } from "./../services/GetCustomers";
import { Request, Response } from "express";
import { Customer } from "../typeorm/entities/Customer";

export class CustomersController {
  public async get(req: Request, res: Response): Promise<Response<Customer[]>> {
    const service = new GetCustomers();
    const obj = await service.execute();
    return res.json(obj);
  }

  public async getById(
    req: Request,
    res: Response
  ): Promise<Response<Customer>> {
    const id = req.params.id;
    const service = new GetCustomerById();
    const obj = await service.execute(id);
    return res.json(obj);
  }

  public async post(req: Request, res: Response): Promise<Response<Customer>> {
    const { name, email } = req.body;
    const service = new PostCustomer();
    const obj = await service.execute(name, email);
    return res.status(201).json(obj);
  }

  public async put(req: Request, res: Response): Promise<Response<Customer>> {
    const { name, email } = req.body;
    const id = req.params.id;
    const service = new PutCustomer();
    const obj = await service.execute(id, name, email);
    return res.json(obj);
  }

  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const id = req.params.id;
    const service = new DeleteCustomer();
    await service.execute(id);
    return res.json();
  }
}
