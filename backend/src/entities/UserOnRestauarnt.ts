import { ObjectType, Field } from "type-graphql";
import { Meal } from "./Meal";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

@ObjectType()
export class UserOnRestaurant {
  @Field((_) => User)
  user: User;

  userId: number;

  @Field((_) => Restaurant, { nullable: true })
  restaurant: Restaurant;

  restaurantId: number;
}
