import { z } from "zod";

// 日本語の出席状況
export const AttendanceStatusSchema = z.enum(["参加", "不参加"]);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

// 日本語の食事オプション
export const MealOptionSchema = z.enum([
  "一般",
  "お子様用(3歳以上くらいから)",
  "ビュッフェのみ",
  "不要",
]);
export type MealOption = z.infer<typeof MealOptionSchema>;

// 同伴者のスキーマ
export const CompanionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "名前を入力してください"),
  furigana: z.string().min(1, "ふりがなを入力してください"),
  allergies: z.string().default(""),
  mealOption: MealOptionSchema,
});
export type Companion = z.infer<typeof CompanionSchema>;

// RSVPフォームデータのスキーマ
export const RSVPFormDataSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  furigana: z.string().min(1, "ふりがなを入力してください"),
  allergies: z.string().default(""),
  companionCount: z.number().min(0).max(10),
  companions: z.array(CompanionSchema).default([]),
  attendance: AttendanceStatusSchema,
  message: z.string().default(""),
});
export type RSVPFormData = z.infer<typeof RSVPFormDataSchema>;

// APIリクエスト用のスキーマ（より厳密）
export const RSVPAPIRequestSchema = RSVPFormDataSchema.refine(
  (data) => {
    // 参加の場合は同伴者の詳細が必要
    if (data.attendance === "参加" && data.companionCount > 0) {
      return data.companions.length === data.companionCount &&
        data.companions.every((c) => c.name.trim() && c.furigana.trim());
    }
    return true;
  },
  {
    message: "同伴者の名前とふりがなを入力してください",
    path: ["companions"],
  },
);

// Supabase用のRSVPデータ
export const RSVPInsertSchema = z.object({
  name: z.string(),
  furigana: z.string(),
  allergies: z.string().optional(),
  attendance: AttendanceStatusSchema,
  message: z.string().optional(),
});
export type RSVPInsert = z.infer<typeof RSVPInsertSchema>;

// Supabase用の同伴者データ
export const CompanionInsertSchema = z.object({
  rsvp_id: z.string(),
  name: z.string(),
  furigana: z.string(),
  allergies: z.string().optional(),
  meal_option: MealOptionSchema,
});
export type CompanionInsert = z.infer<typeof CompanionInsertSchema>;

// フロントエンド用のenum値との変換ヘルパー
export const AttendanceMapping = {
  // フロント → API
  attending: "参加" as const,
  not_attending: "不参加" as const,
  pending: "保留" as const,
  // API → フロント
  "参加": "attending" as const,
  "不参加": "not_attending" as const,
} as const;

export const MealOptionMapping = {
  // フロント → API
  regular: "一般" as const,
  child: "お子様用(3歳以上くらいから)" as const,
  buffet_only: "ビュッフェのみ" as const,
  not_required: "不要" as const,
  // API → フロント
  "一般": "regular" as const,
  "お子様用(3歳以上くらいから)": "child" as const,
  "ビュッフェのみ": "buffet_only" as const,
  "不要": "not_required" as const,
} as const;

// バリデーションエラーを日本語でフォーマットする関数
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join(".");
      return `${path ? `${path}: ` : ""}${issue.message}`;
    })
    .join("\n");
}
