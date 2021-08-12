import { ObjectType, Field } from "type-graphql";
import { Meal } from "./Meal";
import { Order } from "./Order";

@ObjectType()
export class MealsOnOrder {
  @Field((_) => Order)
  order: Order;

  orderId: number;

  @Field((_) => Meal)
  meal: Meal;

  mealId: number;
}
