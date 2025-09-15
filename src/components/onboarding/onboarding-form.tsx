"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client"; // your client

export default function OnboardingForm() {
  const router = useRouter();
  const supabase = createClient(); // instantiate client

  const [role, setRole] = useState("student");
  const [classId, setClassId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingProfile, setCheckingProfile] = useState(true);

  // check if profile already exists
  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/protected");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) router.push("/dashboard");
      setCheckingProfile(false);
    };

    checkProfile();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("User not logged in.");
      setLoading(false);
      router.push("/protected");
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      role,
      class_id: classId || null,
      school_id: schoolId || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  if (checkingProfile) return <p className="text-center mt-16">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="headteacher">Head Teacher</option>
          </select>
        </div>

        {/* Class ID (hide for headteacher) */}
        {role !== "headteacher" && (
          <div>
            <label className="block font-medium mb-1">Class ID</label>
            <input
              type="text"
              placeholder="Enter class ID"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        {/* School ID */}
        <div>
          <label className="block font-medium mb-1">School ID</label>
          <input
            type="text"
            placeholder="Enter school ID"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div id="testing">
          <p>For testing purposes...</p>
          <p>Class 1: 3eaff243-7fe1-4d03-a99b-24bd9386f31a</p>
          <p>Class 2: 8b3d2ef6-a671-4e1c-9894-a8e075652127</p>
          <p>School: 975c2262-2581-4c14-873c-73531d72b446</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-900 text-white py-2 hover:bg-green-200 hover:text-zinc-950 hover:rounded-full transition"
        >
          {loading ? "Saving..." : "Complete Onboarding"}
        </button>
      </form>
    </div>
  );
}
