import { ObjectType, Field } from "type-graphql";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field((_) => String)
  username: string;

  password: string;

  tokenVersion: number;

  @Field((_) => String)
  type: "USER" | "RESTAURANT_OWNER" | "SUPERUSER";

  @Field((_) => [Order], { nullable: true })
  orders?: Order[];

  @Field((_) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
