// app/api/numbers/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  // Return the custom numbers as specified
  const numbers = {
    year: 2012,
    podcasts: 45,
    episodes: 500,
    listeners: 33,
  };

  return NextResponse.json(numbers);
}

