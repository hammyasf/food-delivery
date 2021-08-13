import { User } from "../entities/User";
import { sign } from "jsonwebtoken";

export function createAccessToken(user: User) {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
}

export function createRefreshToken(user: User) {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}
