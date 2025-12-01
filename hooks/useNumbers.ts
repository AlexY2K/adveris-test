// hooks/useNumbers.ts

import { useEffect, useState } from "react";
import { getNumbers, NumbersData } from "@/lib/api/numbers";

export function useNumbers(): NumbersData | null {
  const [numbers, setNumbers] = useState<NumbersData | null>(null);

  useEffect(() => {
    let isMounted = true;

    getNumbers()
      .then((data) => {
        if (isMounted) {
          setNumbers(data);
        }
      })
      .catch((error) => {
        console.error("Error in useNumbers hook:", error);
        // getNumbers already returns fallback values on error,
        // so this catch is mainly for unexpected errors
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return numbers;
}

