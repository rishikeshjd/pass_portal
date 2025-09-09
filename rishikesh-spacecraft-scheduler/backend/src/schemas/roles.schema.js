import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
  title: { required: true, type: String },
  id: { required: true, unique: true, type: String },
  functions: { required: true, type: [String] },  
});


roleSchema.virtual("idd").get(function () {
  return this._id.toHexString();
});

roleSchema.set("toJSON", { virtuals: true });

export const roleModel = mongoose.model("Role", roleSchema);

