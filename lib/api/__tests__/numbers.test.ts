// lib/api/__tests__/numbers.test.ts

import { getNumbers } from "../numbers";

// Mock fetch globally
global.fetch = jest.fn();

describe("getNumbers API function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch numbers from API successfully", async () => {
    const mockData = {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getNumbers();

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/numbers"),
      expect.objectContaining({ cache: "no-store" })
    );
  });

  it("should return fallback values on network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const result = await getNumbers();

    expect(result).toEqual({
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    });
  });

  it("should return fallback values when response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await getNumbers();

    expect(result).toEqual({
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    });
  });

  it("should return fallback values on JSON parse error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    const result = await getNumbers();

    expect(result).toEqual({
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    });
  });
});

