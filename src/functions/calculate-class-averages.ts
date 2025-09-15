// pages/api/calculate-class-averages.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/lib/client";
import mongoose from "mongoose";

// MongoDB model
import ClassAverage from "./classAverage";

// Connect to MongoDB
async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createClient();

  try {
    await connectMongo();

    // 1️⃣ Get all classes
    const { data: classes, error: classesError } = await supabase
      .from("classes")
      .select("id, name, school_id");
    if (classesError) throw classesError;

    for (const cls of classes || []) {
      // 2️⃣ Get all progress for this class
      const { data: progress, error: progressError } = await supabase
        .from("progress")
        .select("marks")
        .eq("class_id", cls.id);

      if (progressError) throw progressError;

      if (progress && progress.length > 0) {
        // 3️⃣ Calculate average
        const sum = progress.reduce((acc, p) => acc + (p.marks || 0), 0);
        const average = sum / progress.length;

        // 4️⃣ Save/update in MongoDB
        await ClassAverage.findOneAndUpdate(
          { classId: cls.id },
          {
            classId: cls.id,
            className: cls.name,
            schoolId: cls.school_id,
            average,
          },
          { upsert: true, new: true }
        );
      }
    }

    res.status(200).json({ message: "Class averages calculated and saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
