const { GraphQLError } = require("graphql");
const { createToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");
const {
  getUserCollection,
  getAllUsers,
  findOneById,
  addUser,
} = require("../model/user");
const { getScans } = require("../model/scan");

const typeDefs = `#graphql
    type Scans{
        _id: ID,
        fileName:String
        file:String
        UserId:String
        createdAt:String
    }
    type Query {
        getScans: [Scans]
    }
`;

const resolvers = {
  Query: {
    getScans: async (_parent, args, contextValue) => {
      const userLogin = await contextValue.auth();
      const scans = await getScans(userLogin.authorId);
      return scans;
    },
  },
};

module.exports = {
  scanTypeDefs: typeDefs,
  scanResolvers: resolvers,
};
