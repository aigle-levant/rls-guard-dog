"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type RawProgress = {
  id: string;
  profile_id: string;
  subject: string;
  marks: number;
  completed_lessons: number;
  total_lessons: number;
  class_id: string;
};

export default function HeadteacherProgressPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<RawProgress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("No user logged in");

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, role, school_id")
          .eq("id", user.id)
          .single();
        if (profileError) throw profileError;
        if (!profileData) throw new Error("No profile found");

        if (profileData.role !== "headteacher") {
          throw new Error("Access denied: not a head teacher");
        }

        const { data, error: progressError } = await supabase
          .from("progress")
          .select(
            "id, profile_id, subject, marks, completed_lessons, total_lessons, class_id"
          )
          .eq("school_id", profileData.school_id);

        if (progressError) throw progressError;

        setProgress(data || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [supabase]);

  if (loading) return <div className="p-6">Loading progress...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (progress.length === 0)
    return <div className="p-6">No progress records found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">School Progress Overview</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Student ID</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Completed Lessons</th>
            <th className="border p-2">Total Lessons</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((p, index) => (
            <tr key={p.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{p.profile_id}</td>
              <td className="border p-2">{p.class_id}</td>
              <td className="border p-2">{p.subject}</td>
              <td className="border p-2">{p.marks}</td>
              <td className="border p-2">{p.completed_lessons}</td>
              <td className="border p-2">{p.total_lessons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
