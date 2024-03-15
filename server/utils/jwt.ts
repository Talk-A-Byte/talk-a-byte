import jwt from "jsonwebtoken";
import * as jose from "jose";

export const createToken = (payload: object) => {
  return jwt.sign(payload, process.env.secretKey);
};

export const verifyToken = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(process.env.secretKey);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
