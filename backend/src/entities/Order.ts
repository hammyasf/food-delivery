import { ObjectType, Field } from "type-graphql";
import { MealsOnOrder } from "./MealsOnOrder";
import { OrderStatus } from "./OrderStatus";
import { Restaurant } from "./Restaurant";
import { User } from "./user";

@ObjectType()
export class Order {
  @Field()
  id: number;

  @Field((_) => User)
  user: User;

  @Field((_) => Restaurant)
  restaurant: Restaurant;

  @Field((_) => [OrderStatus], { nullable: true })
  statuses?: [OrderStatus];

  @Field((_) => [MealsOnOrder])
  meals: MealsOnOrder[];

  userId: number;
  restaurantId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
