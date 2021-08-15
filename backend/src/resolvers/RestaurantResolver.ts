import { Restaurant } from "./../entities/Restaurant";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "./../middlewares/isAuthMiddleware";
import { getAuthUser } from "./../helpers/auth";

@InputType()
class RestaurantInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@InputType()
class RestaurantUpdateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field()
  id: number;
}

@Resolver(Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant], { nullable: true })
  @UseMiddleware(isAuth)
  async restaurants(@Ctx() { prisma, payload, res, req }: MyContext) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });
    if (user!.type === "RESTAURANT_OWNER") {
      return prisma.restaurant.findMany({
        where: { userId: user!.id, deleted: false },
        include: { meals: true },
      });
    }
    return prisma.restaurant.findMany({
      include: { meals: true },
      where: { deleted: false },
    });
  }

  @Query(() => Restaurant, { nullable: true })
  @UseMiddleware(isAuth)
  async restaurant(@Ctx() { prisma }: MyContext, @Arg("id") id: number) {
    return prisma.restaurant.findUnique({
      where: {
        id: id,
      },
      include: { meals: { where: { deleted: false } }, user: true },
    });
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(isAuth)
  async addRestaurant(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: RestaurantInput
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Create New Restaurants.");
    }

    return prisma.restaurant.create({
      data: {
        name: options.name,
        description: options.description,
        userId: user!.id,
      },
    });
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(isAuth)
  async updateRestaurant(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: RestaurantUpdateInput
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Create New Restaurants.");
    }

    const r = await prisma.restaurant.findUnique({ where: { id: options.id } });

    if (r?.userId !== user.id) {
      throw new Error("You cannot edit a restaurant you don't own");
    }

    return prisma.restaurant.update({
      where: {
        id: options.id,
      },
      data: {
        name: options.name,
        description: options.description,
      },
    });
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(isAuth)
  async deleteRestaurant(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("id") id: number
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Create New Restaurants.");
    }

    const r = await prisma.restaurant.findUnique({ where: { id: id } });

    if (r?.userId !== user.id) {
      throw new Error("You cannot edit a restaurant you don't own");
    }

    return prisma.restaurant.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
  }
}
