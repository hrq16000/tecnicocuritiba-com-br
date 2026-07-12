import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom não implementa scrollIntoView — usado por auto-focus do funil.
if (!("scrollIntoView" in Element.prototype)) {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    writable: true,
    value: () => {},
  });
}

// Isola estado persistido do funil entre testes.
beforeEach(() => {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch { /* noop */ }
});

