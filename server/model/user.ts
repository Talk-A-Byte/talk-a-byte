import { ObjectId } from "mongodb";
import { getDatabase } from "../config/mongoConnection";
import { hashPassword } from "../utils/bcrypt";

export const getUserCollection = () => {
  const db = getDatabase();
  const userCollection = db.collection("users");
  return userCollection;
};

export const getAllUsers = async () => {
  const users = await getUserCollection()
    .find(
      {},
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray();
  return users;
};

export const findOneById = async (id: string) => {
  const user = await getUserCollection().findOne(
    {
      _id: new ObjectId(id),
    },
    {
      projection: {
        password: 0,
      },
    }
  );

  return user;
};

export const addUser = async (payload) => {
  payload.password = hashPassword(payload.password);
  const newUser = await getUserCollection().insertOne(payload);

  const user = await getUserCollection().findOne(
    {
      _id: new ObjectId(newUser.insertedId),
    },
    {
      projection: {
        password: 0,
      },
    }
  );
  return user;
};
