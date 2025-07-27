import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  CompanionInsertSchema,
  formatZodError,
  RSVPAPIRequestSchema,
  RSVPInsertSchema,
} from "@/components/rsvp/schemas";

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Supabase not configured. Please set up your environment variables.",
        },
        { status: 503 },
      );
    }

    const rawData = await request.json();

    // Zodでバリデーション
    const validationResult = RSVPAPIRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: formatZodError(validationResult.error),
        },
        { status: 400 },
      );
    }

    const formData = validationResult.data;
    const { name, furigana, allergies, attendance, message, companions } =
      formData;

    // RSVPデータをSupabase用にバリデーション
    const rsvpInsertData = RSVPInsertSchema.parse({
      name,
      furigana,
      allergies: allergies || "",
      attendance,
      message: message || "",
    });

    console.log("Attempting to insert RSVP data:", rsvpInsertData);
    console.log("Supabase configuration:", {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyPrefix:
        process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + "...",
    });

    const { data: rsvpData, error: rsvpError } = await supabase
      .from("rsvps")
      .insert(rsvpInsertData)
      .select("id")
      .single();

    if (rsvpError) {
      console.error("RSVP insertion error:", {
        error: rsvpError,
        data: rsvpInsertData,
        supabaseConfigured: !!supabase,
      });
      return NextResponse.json(
        {
          error: "Failed to save RSVP data",
          details: rsvpError.message || "Unknown database error",
        },
        { status: 500 },
      );
    }

    if (attendance === "参加" && companions && companions.length > 0) {
      const companionInserts = companions.map((companion) =>
        CompanionInsertSchema.parse({
          rsvp_id: rsvpData.id,
          name: companion.name,
          furigana: companion.furigana,
          allergies: companion.allergies || "",
          meal_option: companion.mealOption,
        })
      );

      const { error: companionError } = await supabase
        .from("companions")
        .insert(companionInserts);

      if (companionError) {
        console.error("Companion insertion error:", {
          error: companionError,
          data: companionInserts,
          rsvpId: rsvpData.id,
        });
        await supabase.from("rsvps").delete().eq("id", rsvpData.id);
        return NextResponse.json(
          {
            error: "Failed to save companion data",
            details: companionError.message ||
              "Unknown companion insertion error",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "RSVP submitted successfully",
        rsvpId: rsvpData.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
