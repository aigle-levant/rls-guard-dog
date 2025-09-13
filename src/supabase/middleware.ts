import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
// get env keys from config
import { supabaseKey, supabaseUrl } from "@/config/config";

// checks to ensure key exists
if (!supabaseKey) {
  console.log("Key is missing!");
} else if (!supabaseUrl) {
  console.log("Url is missing!");
}

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  return supabaseResponse;
};
