export enum AttendanceStatus {
  ATTENDING = "attending",
  NOT_ATTENDING = "not_attending",
}

export enum MealOption {
  REGULAR = "regular",
  CHILD = "child",
  BUFFET_ONLY = "buffet_only",
  NOT_REQUIRED = "not_required",
}

export interface Companion {
  id: string;
  name: string;
  furigana: string;
  allergies: string;
  mealOption: MealOption;
}

export interface RSVPFormData {
  name: string;
  furigana: string;
  allergies: string;
  companionCount: number;
  companions: Companion[];
  attendance: AttendanceStatus | null;
  message: string;
}

export interface AttendanceOption {
  value: AttendanceStatus;
  label: string;
}

export interface MealOptionData {
  value: MealOption;
  label: string;
}
