const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getScanCollection = () => {
  const db = getDatabase();
  const scanCollection = db.collection("scans");
  return scanCollection;
};
const getScans = async (UserId) => {
  const scans = await getScanCollection().find({ UserId }).toArray();
  return scans;
};

const addScan = async (file, UserId) => {
  const newScan = await getScanCollection().insertOne();
  return newScan;
};

module.exports = {
  getScans,
};
