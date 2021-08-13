import { Response } from "express";

export function sendRefreshToken(res: Response, token: string) {
  res.cookie("jid", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
  });
}
