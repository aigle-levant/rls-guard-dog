"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type Progress = {
  id: string;
  subject: string;
  marks: number;
  completed_lessons: number;
  total_lessons: number;
  profiles?: {
    id: string;
    role: string;
    class_id: string;
    school_id: string; // required
  } | null;
};

type RawProgress = {
  id: string;
  subject: string;
  marks: number;
  completed_lessons: number;
  total_lessons: number;
  profiles?: {
    id: string;
    role: string;
    class_id: string;
    school_id?: string; // might be missing in raw data
  }[];
};

export default function TeacherProgressPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch class progress for teacher
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("No user found");

        // Fetch teacher profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, role, class_id, school_id")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        if (!profileData) throw new Error("No profile found");

        if (profileData.role !== "teacher") {
          throw new Error("Access denied: not a teacher");
        }

        // Fetch progress of students in teacher's class
        const { data, error: progressError } = await supabase
          .from("progress")
          .select(
            "id, subject, marks, completed_lessons, total_lessons, profile_id, profiles(id, role, class_id)"
          )
          .eq("class_id", profileData.class_id);

        if (progressError) throw progressError;

        const formattedData: Progress[] = (data || []).map(
          (p: RawProgress) => ({
            id: p.id,
            subject: p.subject,
            marks: p.marks,
            completed_lessons: p.completed_lessons,
            total_lessons: p.total_lessons,
            profiles: p.profiles?.[0]
              ? {
                  ...p.profiles[0],
                  school_id: p.profiles[0].school_id || profileData.school_id,
                }
              : null,
          })
        );

        setProgress(formattedData);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [supabase]);

  // Update marks locally and in Supabase
  const updateMarks = async (id: string, marks: number) => {
    setProgress((prev) => prev.map((p) => (p.id === id ? { ...p, marks } : p)));
  };

  // Save all changes to Supabase
  const saveChanges = async () => {
    try {
      for (const p of progress) {
        await supabase
          .from("progress")
          .update({ marks: p.marks })
          .eq("id", p.id);
      }
      alert("Progress updated!");
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to save progress");
    }
  };

  if (loading) return <div className="p-6">Loading progress...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (progress.length === 0)
    return <div className="p-6">No students found in your class.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Progress</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Student ID</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((p, index) => (
            <tr key={p.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{p.profiles?.id}</td>
              <td className="border p-2">{p.profiles?.role}</td>
              <td className="border p-2">{p.profiles?.class_id}</td>
              <td className="border p-2">{p.subject}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={p.marks}
                  onChange={(e) => updateMarks(p.id, +e.target.value)}
                  className="border p-1 w-16"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={saveChanges}
        className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
      >
        Save All Changes
      </button>
    </div>
  );
}
