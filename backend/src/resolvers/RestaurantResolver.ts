import { Restaurant } from "./../entities/Restaurant";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";

@Resolver(Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant], { nullable: true })
  async restaurants(@Ctx() { prisma }: MyContext) {
    return prisma.restaurant.findMany();
  }
}
