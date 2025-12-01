// lib/api/numbers.ts

export interface NumbersData {
  year: number;
  podcasts: number;
  episodes: number;
  listeners: number;
}

export async function getNumbers(): Promise<NumbersData> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/numbers`, {
      cache: "no-store", // Always fetch fresh data on client
    });

    if (!response.ok) {
      throw new Error("Failed to fetch numbers");
    }

    const data: NumbersData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching numbers:", error);
    // Return default values as fallback
    return {
      year: 2012,
      podcasts: 45,
      episodes: 500,
      listeners: 33,
    };
  }
}

