import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { MyContext } from "src/types";
import { isAuth } from "./../middlewares/isAuthMiddleware";
import { getAuthUser } from "./../helpers/auth";
import { Order } from "./../entities/Order";

@InputType()
class OrderMeals {
  @Field(() => [Float])
  meals: number[];

  @Field(() => Float)
  restaurantId: number;
}

@InputType()
class PaginationOptions {
  @Field(() => Float)
  page: number;

  @Field(() => Float)
  perPage: number;
}

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order], { nullable: true })
  @UseMiddleware(isAuth)
  async orders(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") { page, perPage }: PaginationOptions
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });
    if (user!.type === "RESTAURANT_OWNER") {
      return prisma.order.findMany({
        //@ts-ignore
        where: { restaurantId: user!.restaurants!.id },
        include: { meals: { include: { meal: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      });
    }
    return await prisma.order.findMany({
      where: { userId: user!.id },
      include: {
        meals: { include: { meal: true } },
        restaurant: true,
        statuses: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  @Mutation(() => Order, { nullable: true })
  @UseMiddleware(isAuth)
  async cancelOrder(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("id") id: number
  ) {
    const user = await getAuthUser({ context: { prisma, payload, res, req } });

    if (user?.type !== "USER") {
      throw new Error("You Must Be A Regular User To Cancel.");
    }

    const o = await prisma.order.findUnique({
      where: { id: id },
      include: { statuses: { orderBy: { createdAt: "desc" } } },
    });
    if (o?.userId !== user?.id) {
      throw new Error("User Did Not Create This Order");
    }

    if (o.statuses[0].status !== "PLACED") {
      throw new Error("You Can't Cancel An Order After it's accepted");
    }

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: { statuses: { create: { status: "CANCELED" } } },
    });
    return order;
  }

  @Mutation(() => Order, { nullable: true })
  @UseMiddleware(isAuth)
  async placeOrder(
    @Ctx() { prisma, payload, res, req }: MyContext,
    @Arg("options") options: OrderMeals,
    @PubSub() pubSub: PubSubEngine
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

    await options.meals
      .filter((v, i, a) => a.indexOf(v) === i)
      .forEach(async (m) => {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            meals: {
              create: {
                mealId: m,
                quantity: options.meals.filter((mm) => mm === m).length,
              },
            },
          },
        });
      });

    const final_order = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        meals: {
          include: { meal: true },
        },
        restaurant: true,
      },
    });

    await pubSub.publish("ORDERS", final_order);

    return final_order;
  }

  @Subscription(() => Order, {
    topics: "ORDERS",
    nullable: true,
  })
  async newOrder(@Root() orderPayload: any): Promise<Order> {
    return orderPayload;
  }
}
