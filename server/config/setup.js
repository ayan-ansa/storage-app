import { connectDB } from "./db.js";
import mongoose from "mongoose";

await connectDB();
const client = mongoose.connection.getClient();

try {
  const db = mongoose.connection.db;
  const command = "collMod";

  await db.command({
    [command]: "users",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "name",
          "email",
          "rootDirId",
          "role",
          "isDeleted",
          "authProvider",
          "picture",
        ],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength: 3,
            description: "name should be a string with atleast 3 characters",
          },
          email: {
            bsonType: "string",
            description: "please enter a valid email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          },
          password: {
            bsonType: "string",
            minLength: 3,
          },
          role: {
            bsonType: "string",
            enum: ["user", "manager", "admin", "superadmin"],
          },
          isDeleted: {
            bsonType: "bool",
          },
          rootDirId: {
            bsonType: "objectId",
          },
          picture: {
            bsonType: "string",
          },
          authProvider: {
            bsonType: "string",
            enum: ["google", "github", "local"],
          },
        },
        additionalItems: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "directories",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "name", "parentDirId", "userId", "size"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength: 3,
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
          userId: {
            bsonType: "objectId",
          },
          size: {
            bsonType: "number",
          },
        },
        additionalItems: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "files",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "name",
          "filename",
          "path",
          "mimeType",
          "parentDirId",
          "userId",
          "size",
        ],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
          },
          filename: {
            bsonType: "string",
          },
          path: {
            bsonType: "string",
          },
          mimeType: {
            bsonType: "string",
          },
          parentDirId: {
            bsonType: "objectId",
          },
          userId: {
            bsonType: "objectId",
          },
          size: {
            bsonType: "number",
          },
        },
        additionalItems: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });
} catch (error) {
  console.log("Error setting up the database", err);
} finally {
  await client.close();
}
