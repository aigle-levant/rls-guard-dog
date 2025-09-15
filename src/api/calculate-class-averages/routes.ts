// app/api/calculate-class-averages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/client";
import { connectMongo } from "@/lib/mongodb";
import mongoose from "mongoose";

// MongoDB schema for storing averages
const ClassAverageSchema = new mongoose.Schema({
  class_id: String,
  subject: String,
  average_marks: Number,
  total_students: Number,
  updated_at: { type: Date, default: Date.now },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ClassAverage: mongoose.Model<any>;
try {
  ClassAverage = mongoose.model("ClassAverage");
} catch {
  ClassAverage = mongoose.model("ClassAverage", ClassAverageSchema);
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const mongo = await connectMongo();

    // 1️⃣ Fetch all classes
    const { data: classes, error: classError } = await supabase
      .from("classes")
      .select("id, name");
    if (classError) throw classError;

    // 2️⃣ For each class, fetch progress and calculate averages
    for (const cls of classes || []) {
      const { data: progressData, error: progressError } = await supabase
        .from("progress")
        .select("subject, marks")
        .eq("class_id", cls.id);
      if (progressError) continue;

      // Group by subject
      const subjects: Record<string, { sum: number; count: number }> = {};
      (progressData || []).forEach((p) => {
        if (!subjects[p.subject]) subjects[p.subject] = { sum: 0, count: 0 };
        subjects[p.subject].sum += p.marks ?? 0;
        subjects[p.subject].count += 1;
      });

      // Save to MongoDB
      for (const subject in subjects) {
        const { sum, count } = subjects[subject];
        const average_marks = count > 0 ? sum / count : 0;

        await ClassAverage.findOneAndUpdate(
          { class_id: cls.id, subject },
          {
            class_id: cls.id,
            subject,
            average_marks,
            total_students: count,
            updated_at: new Date(),
          },
          { upsert: true, new: true }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
