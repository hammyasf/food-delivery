import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
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
        orderBy: { createdAt: "desc" },
      });
    }
    return await prisma.order.findMany({
      include: {
        meals: { include: { meal: true } },
        restaurant: true,
        statuses: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    });
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
    });

    await pubSub.publish("ORDERS", final_order);

    return final_order;
  }

  @Subscription({
    topics: "ORDERS",
  })
  newOrder(@Root() orderPayload: any): Order {
    return {
      ...orderPayload,
      date: new Date(),
    };
  }
}
