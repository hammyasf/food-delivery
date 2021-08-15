import { Restaurant } from "./../entities/Restaurant";
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "./../middlewares/isAuthMiddleware";
import { getAuthUser } from "./../helpers/auth";
import { Meal } from "./../entities/Meal";

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

@InputType()
class MealInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  restaurantId: number;
}

@InputType()
class MealUpdateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
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
      include: { meals: true, blockedUser: { where: { userId: user!.id } } },
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
      include: { meals: { where: { deleted: false } } },
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

  @Mutation(() => Meal)
  @UseMiddleware(isAuth)
  async addMeal(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: MealInput
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Add Meals.");
    }

    const r = await prisma.restaurant.findUnique({
      where: { id: options.restaurantId },
    });

    if (r?.userId !== user.id) {
      throw new Error("You cannot edit a restaurant you don't own.");
    }

    return prisma.meal.create({
      data: {
        name: options.name,
        description: options.description,
        price: options.price,
        restaurantId: options.restaurantId,
      },
    });
  }

  @Mutation(() => Meal)
  @UseMiddleware(isAuth)
  async updateMeal(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: MealUpdateInput
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Add Meals.");
    }

    const r = await prisma.meal.findUnique({
      where: { id: options.id },
      include: { restaurant: true },
    });

    if (r?.restaurant.userId !== user.id) {
      throw new Error("You cannot edit a restaurant you don't own.");
    }

    return prisma.meal.update({
      where: { id: options.id },
      data: {
        name: options.name,
        description: options.description,
        price: options.price,
      },
    });
  }

  @Mutation(() => Meal)
  @UseMiddleware(isAuth)
  async deleteMeal(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("id") id: number
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "RESTAURANT_OWNER") {
      throw new Error("You Need To Be A Restaurant To Add Meals.");
    }

    const r = await prisma.meal.findUnique({
      where: { id: id },
      include: { restaurant: true },
    });

    if (r?.restaurant.userId !== user.id) {
      throw new Error("You cannot edit a restaurant you don't own.");
    }

    return prisma.meal.update({
      where: { id: id },
      data: {
        deleted: true,
      },
    });
  }
}
