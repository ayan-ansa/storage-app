import { Types } from "mongoose";

export default function (req, res, next, id) {
  
  if (!Types.ObjectId.isValid(id))
    return res.status(404).json({ error: `Invalid ID: ${id}` });

  next();
}
