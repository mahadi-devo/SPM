const mongoose = require('mongoose');

const mongoConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(`MONGODB Connected : ${conn.connection.host}`);
};

module.exports = mongoConnect;
