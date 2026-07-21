import { describe, expect, it, vi } from "vitest";
import { getBooksBySearchTerm } from "./getBooksBySearchTerm";

describe("getBooksBySearchTerm", () => {
  it("Should throw an error when api response is not okay", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    spyFetch.mockResolvedValue({ ok: false });
    await expect(getBooksBySearchTerm("blah")).rejects.toThrow();
    await expect(getBooksBySearchTerm("blah")).rejects.toThrow(
      "Failed to fetch",
    );
  });
});
