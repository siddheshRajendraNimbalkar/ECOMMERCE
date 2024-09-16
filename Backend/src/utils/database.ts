import mongoose from "mongoose";

function connectDB() {
  const db = process.env.DBURL;
  console.log(`Database URL: ${db}`);

  if (!db) {
    console.error('Database URL not provided in environment variables');
    process.exit(1);
  }

  mongoose.connect(`${db}`)
    .then((data) => {
      console.log(`MongoDB is connected to server ${data.connection.host}`);
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
}

export default connectDB;
