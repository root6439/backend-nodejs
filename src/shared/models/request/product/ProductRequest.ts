export interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export interface IPutRequest extends IRequest {
  id: number;
}
