import { describe, it, expect } from "vitest";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

describe("supabase client", () => {
  it("isSupabaseConfigured is false when env vars are absent", () => {
    expect(isSupabaseConfigured).toBe(false);
  });

  it("supabase export is null when not configured", () => {
    expect(supabase).toBeNull();
  });
});
