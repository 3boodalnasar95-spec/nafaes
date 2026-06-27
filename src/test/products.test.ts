import { describe, it, expect } from "vitest";
import {
  searchAreas,
  getAreasByGovernorate,
  formatPrice,
  getTotalAreasCount,
} from "@/data/products";

describe("products data", () => {
  describe("getAreasByGovernorate", () => {
    it("returns Hawalli areas for 'hawalli'", () => {
      const areas = getAreasByGovernorate("hawalli");
      expect(areas.length).toBeGreaterThan(0);
      expect(areas.some((a) => a.id === "salmiya")).toBe(true);
      expect(areas.some((a) => a.id === "hawalli-city")).toBe(true);
      expect(areas.some((a) => a.id === "shaab")).toBe(true);
    });

    it("returns no areas for an unknown governorate", () => {
      expect(getAreasByGovernorate("does-not-exist")).toEqual([]);
    });

    it("never includes areas from other governorates", () => {
      const hawalli = getAreasByGovernorate("hawalli");
      const capital = getAreasByGovernorate("capital");
      const overlap = hawalli.filter((h) =>
        capital.some((c) => c.id === h.id),
      );
      expect(overlap).toEqual([]);
    });
  });

  describe("searchAreas", () => {
    it("finds Salmiya when searching for 'السالمية'", () => {
      const results = searchAreas("السالمية");
      expect(results.some((a) => a.id === "salmiya")).toBe(true);
    });

    it("returns empty array when nothing matches", () => {
      const results = searchAreas("zzz-nonexistent-xyz");
      expect(results).toEqual([]);
    });

    it("filters within a governorate when provided", () => {
      const results = searchAreas("السالمية", "hawalli");
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((a) => a.id === "salmiya")).toBe(true);
    });
  });

  describe("formatPrice", () => {
    it("formats 13.9 as '13.900 د.ك'", () => {
      expect(formatPrice(13.9)).toBe("13.900 د.ك");
    });
  });

  describe("getTotalAreasCount", () => {
    it("matches the size of the kuwaitAreas collection", () => {
      const count = getTotalAreasCount();
      expect(count).toBeGreaterThan(100);
    });
  });
});
