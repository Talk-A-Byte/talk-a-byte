import { GraphQLError } from "graphql";
import { verifyToken } from "./jwt";
import { findOneById } from "../model/user";

export const jwtAuthentication = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  const token: string = authorization.split(" ")[1];

  if (!token) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  const decodedToken: { id: string; email: string; username: string } =
    await verifyToken(token);

  const user = await findOneById(decodedToken.id);

  if (!user) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthorized",
        http: { status: 401 },
      },
    });
  }

  return {
    authorId: user._id,
    username: user.username,
    userEmail: user.email,
  };
};
