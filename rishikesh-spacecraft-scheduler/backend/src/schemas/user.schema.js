import mongoose from "mongoose";

/*const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  email_verified_at: { type: Date },
  password: { required: true, type: String },
  profile_image: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});*/

const allowedObj = new mongoose.Schema({
  role_id: { required: true, type: String },
  satellites: { type: String },
  stations: { type: String },  
});

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  username: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  allowed: {required: true, type: [allowedObj] },  
});


userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

export const userModel = mongoose.model("User", userSchema);





