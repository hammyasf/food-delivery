import { Response } from "express";

export function sendRefreshToken(res: Response, token: string) {
  res.cookie("jid", token, {
    httpOnly: true,
  });
}
