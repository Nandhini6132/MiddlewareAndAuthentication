import mongoose from "mongoose";

const connectToDB = async () => {
  const url = "mongodb+srv://Nandhini:Elakkiya@cluster0.7ucexvj.mongodb.net/";

  mongoose
    .connect(url)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err));
};


export default connectToDB

