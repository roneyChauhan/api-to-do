const mongoose = require('mongoose');

const { APP_MONGO_URI} = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose
      .connect(APP_MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };
  