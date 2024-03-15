const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../utils/bcrypt");

const getUserCollection = () => {
  const db = getDatabase();
  const userCollection = db.collection("users");
  return userCollection;
};

const getAllUsers = async () => {
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

const findOneById = async (id) => {
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

const addUser = async (payload) => {
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
module.exports = {
  getUserCollection,
  getAllUsers,
  findOneById,
  addUser,
};
