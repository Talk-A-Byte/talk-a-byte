const { GraphQLError } = require("graphql");
const { createToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");
const {
  getUserCollection,
  getAllUsers,
  findOneById,
  addUser,
} = require("../model/user");
const { getScans, addScan } = require("../model/scan");

const typeDefs = `#graphql
    type Scans{
        _id: ID,
        fileName:String
        file:String
        UserId:String
        createdAt:String
    }
    type addScanRes {
      acknowledged: Boolean
      insertedId: ID
    }
    type Query {
        getScans: [Scans]
    }
    type Mutation {
      addScan(file:String): addScanRes
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
  Mutation: {
    addScan: async (_parent, args, contextValue) => {
      const userLogin = await contextValue.auth();
      const newScan = await addScan(
        args.fileName,
        args.file,
        userLogin.authorId
      );
      return newScan;
    },
  },
};

module.exports = {
  scanTypeDefs: typeDefs,
  scanResolvers: resolvers,
};
