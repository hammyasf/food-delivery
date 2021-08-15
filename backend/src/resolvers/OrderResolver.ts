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
import { Order } from "./../entities/Order";
import { Meal } from "../entities/Meal";

@InputType()
class OrderMeals {
  @Field(() => [Float])
  meals: number[];

  @Field(() => Float)
  restaurantId: number;
}

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order], { nullable: true })
  @UseMiddleware(isAuth)
  async orders(@Ctx() { prisma, payload, res, req }: MyContext) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });
    if (user!.type === "RESTAURANT_OWNER") {
      return prisma.order.findMany({
        //@ts-ignore
        where: { restaurantId: user!.restaurants!.id },
        include: { meals: { include: { meal: true } } },
      });
    }
    return await prisma.order.findMany({
      include: { meals: { include: { meal: true } }, restaurant: true },
    });
  }

  @Mutation(() => Order, { nullable: true })
  @UseMiddleware(isAuth)
  async placeOrder(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: OrderMeals
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    const order = await prisma.order.create({
      data: {
        restaurantId: options.restaurantId,
        userId: user!.id,
        statuses: {
          create: { status: "PLACED" },
        },
      },
    });

    const meals = options.meals.map((m) => {
      return {
        mealId: m,
      };
    });

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },

      data: { meals: { createMany: { data: [...meals] } } },
    });

    return prisma.order.findUnique({
      where: { id: order.id },
      include: { meals: true, restaurant: true },
    });
  }
}
