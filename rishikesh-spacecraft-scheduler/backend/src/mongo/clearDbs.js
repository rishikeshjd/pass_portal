  GNU nano 5.6.1                                                                          clearDbs.js                                                                                    
import mongoose from "mongoose";
import { userModel } from "../schemas/user.schema.js";
import { dbConnect } from "../mongo/index.js";

async function clear() {
  dbConnect();
  await userModel.deleteMany({});
  console.log("DB cleared");
}

clear().then(() => {
  mongoose.connection.close();
});


