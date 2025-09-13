import { createBrowserClient } from "@supabase/ssr";
// get env keys from config
import { supabaseKey, supabaseUrl } from "@/config/config";

// checks to ensure key exists
if (!supabaseKey) {
  console.log("Key is missing!");
} else if (!supabaseUrl) {
  console.log("Url is missing!");
}

// create supabase client
export const supabase = createBrowserClient(supabaseUrl!, supabaseKey!);
