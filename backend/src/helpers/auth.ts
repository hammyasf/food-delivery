import { User } from "../entities/User";
import { sign, verify } from "jsonwebtoken";
import { MyContext } from "src/types";

export function createAccessToken(user: User) {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
}

export function createRefreshToken(user: User) {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "30d",
    }
  );
}

export async function getAuthUser({
  context,
}: {
  context: MyContext;
}): Promise<User | null> {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    return null;
  }

  try {
    const token = authorization?.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    return null;
  }

  return await context.prisma.user.findUnique({
    where: { id: parseInt(context.payload!.userId) },
  });
}
