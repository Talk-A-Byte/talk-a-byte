import { ObjectId } from "mongodb";

export type loginInfo = {
  authorId: ObjectId;
  userEmail: string;
};

export type payload = {
  id: ObjectId;
  email: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
