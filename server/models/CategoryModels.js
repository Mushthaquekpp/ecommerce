import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, lowerCase: true },
});
export default mongoose.model("category", userSchema);
