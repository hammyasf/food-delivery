import { ObjectType, Field, Float } from "type-graphql";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";

@ObjectType()
export class Meal {
  @Field()
  id: number;

  @Field((_) => String)
  name: String;

  @Field((_) => String)
  description: String;

  @Field((_) => Float)
  price: number;

  @Field((_) => Restaurant)
  restaurant: Restaurant;

  @Field((_) => [Order], { nullable: true })
  orders?: Order[];

  restaurantId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
