const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getScanCollection = () => {
  const db = getDatabase();
  const scanCollection = db.collection("scans");
  return scanCollection;
};
const getScans = async (UserId) => {
  const agg = [
    {
      $match: {
        UserId,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  const scans = await getScanCollection().aggregate(agg).toArray();
  return scans;
};

const addScan = async (fileName, file, UserId) => {
  const newScan = await getScanCollection().insertOne({
    fileName,
    file,
    UserId,
    createdAt: `${new Date()}`,
  });
  return newScan;
};

module.exports = {
  addScan,
  getScans,
};
