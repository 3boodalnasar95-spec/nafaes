import { describe, it, expect } from "vitest";
import {
  generateOrderNumber,
  generateInvoiceNumber,
  formatPrice,
  getFormattedDate,
} from "@/utils/orderUtils";

describe("orderUtils", () => {
  describe("generateOrderNumber", () => {
    it("starts with NAF- prefix", () => {
      expect(generateOrderNumber().startsWith("NAF-")).toBe(true);
    });

    it("matches pattern NAF-YYMMDD-HHMM-XXXX", () => {
      expect(generateOrderNumber()).toMatch(/^NAF-\d{6}-\d{4}-\d{4}$/);
    });

    it("produces a unique value on each call", () => {
      const a = generateOrderNumber();
      const b = generateOrderNumber();
      expect(a === b).toBe(false);
    });
  });

  describe("generateInvoiceNumber", () => {
    it("starts with INV- prefix", () => {
      expect(generateInvoiceNumber().startsWith("INV-")).toBe(true);
    });

    it("matches pattern INV-YYYYMM-XXXXX", () => {
      expect(generateInvoiceNumber()).toMatch(/^INV-\d{6}-\d{5}$/);
    });
  });

  describe("formatPrice", () => {
    it("formats 10.5 as '10.500 د.ك'", () => {
      expect(formatPrice(10.5)).toBe("10.500 د.ك");
    });

    it("formats integer 7 as '7.000 د.ك'", () => {
      expect(formatPrice(7)).toBe("7.000 د.ك");
    });
  });

  describe("getFormattedDate", () => {
    it("returns a non-empty string", () => {
      const date = getFormattedDate();
      expect(typeof date).toBe("string");
      expect(date.length).toBeGreaterThan(0);
    });

    it("returns an Arabic-formatted string", () => {
      const date = getFormattedDate();
      expect(date).toMatch(/[\u0600-\u06FF]/);
    });
  });
});
