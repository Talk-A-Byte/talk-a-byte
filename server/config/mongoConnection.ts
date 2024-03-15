require("dotenv").config();
import { Db, MongoClient } from "mongodb";
const uri: string = process.env.MONGODB_URI;
const client: MongoClient = new MongoClient(uri);
const dbName: string = "twitter_database";
let database: Db;

export async function mongoConnect() {
  try {
    await client.connect();
    console.log("Successfully connected to mongodb");
    database = client.db(dbName);
    return database;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getDatabase() {
  return database;
}
