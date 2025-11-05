const mongoose = require('mongoose');

async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {
    // Options kept minimal for Mongoose >= 6
  });
}

module.exports = { connectDatabase };


