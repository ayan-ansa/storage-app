import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: 3,
      required: function () {
        return this.authProvider === "local";
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "manager", "admin", "superadmin"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    rootDirId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["google", "github", "local"],
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCS2wb0ixNEu-qFWrF9k1ml03x2jJ6Fc_eKA&s",
    },
  },
  {
    strict: "throw",
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
