import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  const noop = () => {};
  window.console.log = noop;
  window.console.debug = noop;
  window.console.info = noop;
}
