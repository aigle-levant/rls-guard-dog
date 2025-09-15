import mongoose, { Schema, Document, Model } from "mongoose";

interface IClassAverage extends Document {
  classId: string;
  className: string;
  schoolId: string;
  average: number;
}

const ClassAverageSchema: Schema<IClassAverage> = new Schema({
  classId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  schoolId: { type: String, required: true },
  average: { type: Number, required: true },
});

const ClassAverage: Model<IClassAverage> =
  mongoose.models.ClassAverage ||
  mongoose.model("ClassAverage", ClassAverageSchema);

export default ClassAverage;
