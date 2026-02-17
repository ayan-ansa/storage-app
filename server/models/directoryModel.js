import mongoose from "mongoose";

const directorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    parentDirId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Directory",
    },
    size: { type: Number, default: 0 },
  },
  { timestamps: true },
  { strict: "throw" },
);

const Directory = mongoose.model("Directory", directorySchema);
export default Directory;
