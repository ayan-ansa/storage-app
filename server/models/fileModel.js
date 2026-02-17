import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimeType: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    parentDirId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    size: { type: Number, required: true },
  },
  { timestamps: true },
  { strict: "throw" },
);

const File = mongoose.model("File", fileSchema);
export default File;
