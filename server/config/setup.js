import { connectDB } from "./db.js";
import { client } from "./db.js";

const db = await connectDB();

const command = "create";


await db.command({
  [command]: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "email", "password", "rootDirId"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        name: {
          bsonType: "string",
          minLength: 3,
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
        },
        password: {
          bsonType: "string",
          minLength: 3,
        },
        rootDirId: {
          bsonType: "objectId",
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
      required: ["_id", "name", "parentDirId", "userId"],
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
      required: ["_id", "name", "extension", "parentDirId", "userId"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        name: {
          bsonType: "string",
        },
        extension: {
          bsonType: "string",
        },
        parentDirId: {
          bsonType: "objectId",
        },
        userId: {
          bsonType: "objectId",
        },
      },
      additionalItems: false,
    },
  },
  validationAction: "error",
  validationLevel: "strict",
});

client.close();
