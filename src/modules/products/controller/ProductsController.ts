import { DeleteProduct } from "./../services/DeleteProduct";
import { PutProduct } from "./../services/PutProduct";
import { PostProduct } from "./../services/PostProduct";
import { GetProductById } from "./../services/GetProductById";
import { Product } from "./../typeorm/entities/Product";
import { GetProducts } from "./../services/GetProducts";
import { Request, response, Response } from "express";

export class ProductsController {
  public async get(req: Request, res: Response): Promise<Response<Product[]>> {
    const listProducts = new GetProducts();
    const prods = await listProducts.execute();
    return res.json(prods);
  }

  public async getById(
    req: Request,
    res: Response
  ): Promise<Response<Product>> {
    const id = req.params.id;
    const getProdById = new GetProductById();
    const prod = await getProdById.execute(id);
    return res.json(prod);
  }

  public async post(req: Request, res: Response): Promise<Response<Product>> {
    const { name, price, quantity } = req.body;
    const postProd = new PostProduct();
    const prod = await postProd.execute({ name, price, quantity });
    return res.json(prod);
  }

  public async put(req: Request, res: Response): Promise<Response<Product>> {
    const { name, price, quantity } = req.body;
    const id = req.params.id;
    const putProd = new PutProduct();
    const prod = await putProd.execute({ id, name, price, quantity });
    return res.json(prod);
  }

  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const id = req.params.id;
    const deleteProd = new DeleteProduct();
    await deleteProd.execute(id);
    return res.json();
  }
}
