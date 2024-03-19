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

const addScan = async (fileName, file, UserId) => {
  const newScan = await getScanCollection().insertOne({
    fileName,
    file,
    UserId,
  });
  return newScan;
};

module.exports = {
  addScan,
  getScans,
};
