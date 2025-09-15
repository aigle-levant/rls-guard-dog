"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<{
    id: string;
    role?: string;
    school_name?: string;
    class_name?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      // Fetch profile with foreign key relationships
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, school_id, class_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // Fetch school name
      let school_name = "N/A";
      if (data.school_id) {
        const { data: schoolData } = await supabase
          .from("schools")
          .select("name")
          .eq("id", data.school_id)
          .single();
        school_name = schoolData?.name ?? "N/A";
      }

      // Fetch class name
      let class_name = "N/A";
      if (data.class_id) {
        const { data: classData } = await supabase
          .from("classes")
          .select("name")
          .eq("id", data.class_id)
          .single();
        class_name = classData?.name ?? "N/A";
      }

      // Now set profile
      setProfile({
        id: data.id,
        role: data.role,
        school_name,
        class_name,
      });

      setLoading(false);
    };

    fetchProfile();
  }, [supabase]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!profile) return <div className="p-6">No profile found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md space-y-4">
        <div>
          <span className="font-semibold">User ID: </span>
          {profile.id}
        </div>
        <div>
          <span className="font-semibold">School: </span>
          {profile.school_name}
        </div>
        <div>
          <span className="font-semibold">Class: </span>
          {profile.class_name}
        </div>
        <div>
          <span className="font-semibold">Role: </span>
          {profile.role}
        </div>
      </div>

      <Separator className="my-6" />
    </div>
  );
}
