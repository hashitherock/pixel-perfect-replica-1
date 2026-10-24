import { describe, expect, it } from "vitest";
import { filterServices, services } from "./services";

describe("filterServices", () => {
  it("includes all 22 services", () => expect(services).toHaveLength(22));
  it("matches by keyword", () => {
    expect(filterServices(services, "translate", "all").map((s) => s.slug)).toEqual(["papago"]);
  });
  it("filters by category", () => {
    expect(filterServices(services, "", "commerce").map((s) => s.slug)).toEqual(["shopping", "smart-store"]);
  });
  it("returns empty for no match", () => {
    expect(filterServices(services, "zzzz", "all")).toHaveLength(0);
  });
});
