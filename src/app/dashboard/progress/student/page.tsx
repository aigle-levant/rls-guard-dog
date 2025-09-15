// app/dashboard/progress/student/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type Progress = {
  id: string;
  subject: string;
  marks: number;
  completed_lessons: number;
  total_lessons: number;
};

export default function StudentProgressPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // logged-in user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("You must be logged in to view your progress.");
          setLoading(false);
          return;
        }

        // get only this student's progress
        const { data, error } = await supabase
          .from("progress")
          .select("id, subject, marks, completed_lessons, total_lessons")
          .eq("profile_id", user.id);

        if (error) throw error;

        setProgress(data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [supabase]);

  if (loading) return <div className="p-6">Loading progress...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Progress</h1>

      {progress.length === 0 ? (
        <div>No progress records found.</div>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Marks</th>
              <th className="p-2 text-left">Completed Lessons</th>
              <th className="p-2 text-left">Total Lessons</th>
            </tr>
          </thead>
          <tbody>
            {progress.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.subject}</td>
                <td className="p-2">{p.marks}</td>
                <td className="p-2">{p.completed_lessons}</td>
                <td className="p-2">{p.total_lessons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
