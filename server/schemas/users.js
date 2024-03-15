const { GraphQLError } = require("graphql");
const { createToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");
const {
  getUserCollection,
  getAllUsers,
  findOneById,
  addUser,
} = require("../model/user");

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String!
        email: String!
        password: String
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String
    }

    type LoginOutput {
        token: String
    }
    
    type Query {
        getUsers: [User]
        userDetail(userId: ID): User
    }

    type Mutation {
        register(payload: RegisterInput): User
        login(email: String!, password: String!): LoginOutput
    }
    `;

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await getAllUsers();

      return users;
    },
    userDetail: async (_parent, args) => {
      const { userId } = args;
      const userFound = await findOneById(userId);
      if (!userFound) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "Not Found",
            http: { status: 404 },
          },
        });
      }

      return userFound;
    },
  },
  Mutation: {
    register: async (_parent, args) => {
      const { payload } = args;
      const { email, password } = payload;

      if (!email) {
        throw new GraphQLError("Email is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      );
      if (regex === false) {
        throw new GraphQLError("Email address is not valid", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      if (!password) {
        throw new GraphQLError("Password is required", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      } else if (password.length < 5) {
        throw new GraphQLError("Password must contain at least 5 words", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const duplicateMail = await getUserCollection().findOne({ email });
      if (duplicateMail) {
        throw new GraphQLError("Email is already taken", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const newUser = await addUser(payload);

      return newUser;
    },

    login: async (_parent, args) => {
      const { email, password } = args;
      const user = await getUserCollection().findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "Unauthorized",
            http: { status: 401 },
          },
        });
      }

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "Unauthorized",
            http: { status: 401 },
          },
        });
      }

      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = createToken(payload);

      return {
        token,
      };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
