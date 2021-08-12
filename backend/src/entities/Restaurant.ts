import { ObjectType, Field } from "type-graphql";
import { Meal } from "./Meal";
import { Order } from "./Order";
import { User } from "./user";

@ObjectType()
export class Restaurant {
  @Field()
  id: number;

  @Field((_) => String)
  name: String;

  @Field((_) => String)
  description: String;

  @Field((_) => [Order], { nullable: true })
  orders?: Order[];

  @Field((_) => [Meal], { nullable: true })
  meals?: Meal[];

  @Field((_) => User)
  user: User;

  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
