import { describe, expect, it } from "vitest";
import { directionsUrl } from "@/lib/maps";

const base = "https://www.google.com/maps/dir/?api=1&destination=";

describe("directionsUrl", () => {
  it("routes to the confirmed pin when the office has one", () => {
    expect(
      directionsUrl({
        address: "Test address",
        city: "Kano",
        pin: { latitude: 12.5, longitude: 8.25 },
      }),
    ).toBe(`${base}12.5%2C8.25`);
  });

  it("falls back to the full, encoded address", () => {
    expect(
      directionsUrl({ address: "No. 3 Dorawa Road, Nasarawa", city: "Kano" }),
    ).toBe(
      `${base}No.%203%20Dorawa%20Road%2C%20Nasarawa%2C%20Kano%2C%20Nigeria`,
    );
  });
});
