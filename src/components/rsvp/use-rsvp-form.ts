"use client";

import { useState } from "react";
import {
  type Companion,
  formatZodError,
  type RSVPFormData,
  RSVPFormDataSchema,
} from "@/components/rsvp/schemas";

export function useRSVPForm() {
  const [formData, setFormData] = useState<Partial<RSVPFormData>>({
    name: "",
    furigana: "",
    allergies: "",
    companionCount: 0,
    companions: [],
    attendance: undefined,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateCompanionCount = (newCount: number) => {
    const currentCompanions = formData.companions || [];
    const newCompanions: Companion[] = [];

    if (newCount > 0) {
      for (let i = 0; i < newCount; i++) {
        if (currentCompanions[i]) {
          newCompanions.push(currentCompanions[i]);
        } else {
          newCompanions.push({
            id: `companion-${i}`,
            name: "",
            furigana: "",
            allergies: "",
            mealOption: "一般",
          });
        }
      }
    }

    setFormData({
      ...formData,
      companionCount: newCount,
      companions: newCompanions,
    });
  };

  const updateCompanion = (
    id: string,
    field: keyof Companion,
    value: string,
  ) => {
    setFormData({
      ...formData,
      companions: (formData.companions || []).map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const updateFormData = (updates: Partial<RSVPFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  const validateForm = (): string | null => {
    const result = RSVPFormDataSchema.safeParse(formData);
    if (!result.success) {
      return formatZodError(result.error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // クライアントサイドバリデーション
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus("error");
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return false;
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.details || result.error ||
          "Failed to submit RSVP";
        throw new Error(errorMsg);
      }

      setSubmitStatus("success");
      return true;
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    errorMessage,
    updateCompanionCount,
    updateCompanion,
    updateFormData,
    validateForm,
    handleSubmit,
  };
}
