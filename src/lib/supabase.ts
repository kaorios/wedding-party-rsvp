import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (
  !supabaseUrl || !supabaseServiceKey ||
  supabaseUrl === "your_supabase_project_url" ||
  supabaseServiceKey === "your_supabase_service_role_key"
) {
  console.warn(
    "Supabase environment variables not configured properly. Using mock configuration for development.",
  );
}

export const supabase = supabaseUrl && supabaseServiceKey &&
    supabaseUrl !== "your_supabase_project_url" &&
    supabaseServiceKey !== "your_supabase_service_role_key"
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  : null;

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string;
          name: string;
          furigana: string;
          allergies: string;
          attendance: "参加" | "不参加";
          message: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          furigana: string;
          allergies?: string;
          attendance: "参加" | "不参加";
          message?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          furigana?: string;
          allergies?: string;
          attendance?: "参加" | "不参加";
          message?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      companions: {
        Row: {
          id: string;
          rsvp_id: string;
          name: string;
          furigana: string;
          allergies: string;
          meal_option:
            | "一般"
            | "お子様用(3歳以上くらいから)"
            | "ビュッフェのみ"
            | "不要";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          rsvp_id: string;
          name: string;
          furigana: string;
          allergies?: string;
          meal_option:
            | "一般"
            | "お子様用(3歳以上くらいから)"
            | "ビュッフェのみ"
            | "不要";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          rsvp_id?: string;
          name?: string;
          furigana?: string;
          allergies?: string;
          meal_option?:
            | "一般"
            | "お子様用(3歳以上くらいから)"
            | "ビュッフェのみ"
            | "不要";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type RSVPData = Database["public"]["Tables"]["rsvps"]["Row"];
export type RSVPInsert = Database["public"]["Tables"]["rsvps"]["Insert"];
export type CompanionData = Database["public"]["Tables"]["companions"]["Row"];
export type CompanionInsert =
  Database["public"]["Tables"]["companions"]["Insert"];
