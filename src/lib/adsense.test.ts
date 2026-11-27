import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadAdSense, loadAdSenseIfConsented } from "./adsense";
import { setConsent } from "./consent";

describe("AdSense consent", () => {
  const script = () => document.getElementById("adsbygoogle-js");
  beforeEach(() => { localStorage.clear(); script()?.remove(); });
  afterEach(() => { localStorage.clear(); script()?.remove(); });
  it("does not insert advertising without advertising consent", () => {
    loadAdSense();
    expect(script()).toBeNull();
    setConsent({ ads: false, analytics: true });
    loadAdSenseIfConsented();
    loadAdSense();
    expect(script()).toBeNull();
  });
  it("inserts only one script after explicit advertising consent", () => {
    setConsent({ ads: true, analytics: false });
    loadAdSenseIfConsented();
    loadAdSense();
    expect(document.querySelectorAll("#adsbygoogle-js")).toHaveLength(1);
  });
});
