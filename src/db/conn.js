import mongoose from "mongoose";

const connetcDB = (url) => {
  mongoose
    .connect(url, {
      //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Seccessfull");
    })
    .catch((e) => {
      console.log("No Connection Seccessfull", e);
    });
};

export default connetcDB;
