import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/user";
import { MyContext } from "../types";
import argon2 from "argon2";
import { createAccessToken, createRefreshToken } from "./../helpers/auth";
import { sendRefreshToken } from "./../helpers/sendRefreshToken";
import { isAuth } from "./../middlewares/isAuthMiddleware";
import { verify } from "jsonwebtoken";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
class UsernamePasswordTypeInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  restaurant: boolean;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  accessToken?: String;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordTypeInput,
    @Ctx() { prisma }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Length Must Be Greater Than 2",
          },
        ],
      };
    }
    if (options.password.length <= 7) {
      return {
        errors: [
          {
            field: "password",
            message: "Length Must Be Greater Than 7",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    const checkUser = await prisma.user.findUnique({
      where: { username: options.username },
    });

    if (checkUser !== null) {
      return {
        errors: [
          {
            field: "username",
            message: "Username already taken.",
          },
        ],
      };
    }

    const user_type = options.restaurant ? "RESTAURANT_OWNER" : "USER";

    const user = await prisma.user.create({
      data: {
        username: options.username.toLowerCase(),
        password: hashedPassword,
        type: user_type,
      },
    });

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { prisma, res }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Length Must Be Greater Than 2",
          },
        ],
      };
    }
    if (options.password.length <= 7) {
      return {
        errors: [
          {
            field: "password",
            message: "Length Must Be Greater Than 7",
          },
        ],
      };
    }

    const user = await prisma.user.findUnique({
      where: { username: options.username },
    });

    if (user !== null) {
      const verifyPassword = await argon2.verify(
        user.password,
        options.password
      );
      if (!verifyPassword) {
        return {
          errors: [
            {
              field: "password",
              message: "Incorrect Password.",
            },
          ],
        };
      }

      sendRefreshToken(res, createRefreshToken(user));
      return { user, accessToken: createAccessToken(user) };
    } else {
      return {
        errors: [
          {
            field: "username",
            message: "Incorrect Username.",
          },
        ],
      };
    }
  }

  @Mutation((_) => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization?.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
      return context.prisma.user.findUnique({ where: { id: payload.userId } });
    } catch (err) {
      console.log(err);
      return null;
    }

    return null;
  }

  @Query((_) => User)
  @UseMiddleware(isAuth)
  async currentUser(@Ctx() { prisma, payload }: MyContext): Promise<User> {
    console.log({ payload });
    //@ts-ignore
    return (await prisma.user.findUnique({
      where: { id: parseInt(payload?.userId!) },
      include: {
        orders: {
          include: { meals: true },
        },
        restaurants: {
          include: { meals: true },
        },
      },
    })) as User;
  }
}
