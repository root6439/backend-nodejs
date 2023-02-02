import { OrdersProducts } from "./../../../orders/typeorm/entities/OrdersProducts";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @Column("varchar")
  name: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
