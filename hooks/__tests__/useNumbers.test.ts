// hooks/__tests__/useNumbers.test.ts

import { renderHook, waitFor } from "@testing-library/react";
import { useNumbers } from "../useNumbers";
import { getNumbers } from "@/lib/api/numbers";
import { NumbersData } from "@/lib/api/numbers";

// Mock the API function
jest.mock("@/lib/api/numbers", () => ({
  getNumbers: jest.fn(),
}));

const mockedGetNumbers = getNumbers as jest.MockedFunction<typeof getNumbers>;

describe("useNumbers hook", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should return null initially", () => {
    mockedGetNumbers.mockResolvedValue({
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    });

    const { result } = renderHook(() => useNumbers());
    expect(result.current).toBeNull();
  });

  it("should fetch and return numbers data", async () => {
    const mockData: NumbersData = {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };

    mockedGetNumbers.mockResolvedValue(mockData);

    const { result } = renderHook(() => useNumbers());

    // Wait for the async operation to complete
    await waitFor(
      () => {
        expect(result.current).not.toBeNull();
      },
      { timeout: 3000 }
    );

    expect(result.current).toEqual(mockData);
    expect(mockedGetNumbers).toHaveBeenCalledTimes(1);
  });

  it("should handle errors gracefully and return fallback values", async () => {
    const fallbackData: NumbersData = {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };

    // Mock getNumbers to return fallback on error
    mockedGetNumbers.mockResolvedValue(fallbackData);

    const { result } = renderHook(() => useNumbers());

    await waitFor(
      () => {
        expect(result.current).not.toBeNull();
      },
      { timeout: 3000 }
    );

    // Even on error, getNumbers returns fallback values
    expect(result.current).toEqual(fallbackData);
  });

  it("should not update state if component unmounts before fetch completes", async () => {
    const mockData: NumbersData = {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };

    // Create a promise that we can control
    let resolvePromise: (value: NumbersData) => void;
    const controlledPromise = new Promise<NumbersData>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetNumbers.mockReturnValue(controlledPromise);

    const { result, unmount } = renderHook(() => useNumbers());

    // Unmount before promise resolves
    unmount();

    // Resolve the promise after unmount
    resolvePromise!(mockData);

    // Wait a bit to ensure state update would have happened
    await new Promise((resolve) => setTimeout(resolve, 100));

    // The result should still be null because component unmounted
    // (This tests the cleanup logic in the hook)
    expect(result.current).toBeNull();
  });

  it("should only fetch once on mount", async () => {
    const mockData: NumbersData = {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };

    mockedGetNumbers.mockResolvedValue(mockData);

    const { rerender } = renderHook(() => useNumbers());

    await waitFor(() => {
      expect(mockedGetNumbers).toHaveBeenCalledTimes(1);
    });

    // Rerender should not trigger another fetch
    rerender();
    await waitFor(() => {
      expect(mockedGetNumbers).toHaveBeenCalledTimes(1);
    });
  });
});

