import mongoose from "mongoose";
// get connection string from config
import { mongoConnectionString } from "@/config/config";

// to fix ts error on global.mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Mongoose | null };
}

// if first time creating a new connection
// set it up as null
// no need to create multiple connections
if (!global.mongoose) {
  global.mongoose = { conn: null };
}

// connect mongo via mongoose
export async function connectMongo() {
  // ? for ts safety
  if (global.mongoose?.conn) return global.mongoose.conn;
  const conn = await mongoose.connect(mongoConnectionString!);
  global.mongoose.conn = conn;
  return conn;
}
