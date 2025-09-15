"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export default function ProgressRedirect() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // get profile role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        router.push("/error?reason=noprofile");
        return;
      }

      switch (profile.role) {
        case "student":
          router.push("/dashboard/progress/student");
          break;
        case "teacher":
          router.push("/dashboard/progress/teacher");
          break;
        case "headteacher":
          router.push("/dashboard/progress/head");
          break;
        default:
          router.push("/error?reason=unauthorized");
      }
    };

    checkRole();
  }, [router, supabase]);

  return <div className="p-6">Checking role...</div>;
}
