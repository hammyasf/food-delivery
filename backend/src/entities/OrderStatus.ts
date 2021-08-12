import { ObjectType, Field } from "type-graphql";
import { Order } from "./Order";

@ObjectType()
export class OrderStatus {
  @Field()
  id: number;

  @Field((_) => String)
  status:
    | "PLACED"
    | "CANCELED"
    | "PROCESSING"
    | "IN_ROUTE"
    | "DELIVERED"
    | "RECEIVED";

  @Field((_) => Order)
  order: Order;

  orderId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
