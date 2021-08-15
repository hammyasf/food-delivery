import { Restaurant } from "./../entities/Restaurant";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "./../middlewares/isAuthMiddleware";
import { getAuthUser } from "./../helpers/auth";

@Resolver(Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant], { nullable: true })
  @UseMiddleware(isAuth)
  async restaurants(@Ctx() { prisma, payload, res, req }: MyContext) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });
    if (user!.type === "RESTAURANT_OWNER") {
      return prisma.restaurant.findMany({
        where: { userId: user!.id },
        include: { meals: true },
      });
    }
    return prisma.restaurant.findMany({ include: { meals: true } });
  }

  @Query(() => Restaurant, { nullable: true })
  @UseMiddleware(isAuth)
  async restaurant(@Ctx() { prisma }: MyContext, @Arg("id") id: number) {
    return prisma.restaurant.findUnique({
      where: {
        id: id,
      },
      include: { meals: true, user: true },
    });
  }
}
