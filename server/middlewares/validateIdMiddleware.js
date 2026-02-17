import { Types } from "mongoose";

export default function (req, res, next, id) {
  if (!Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: `Invalid ID: ${id}` });

  next();
}
