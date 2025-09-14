// store env keys
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY! || "";
export const mongoConnectionString =
  process.env.MONGO_DB_CONNECTION_STRING || "";
export const localPublicUrl = process.env.LOCAL_URL || "";
export const prodPublicUrl = process.env.PROD_URL || "";
