import { useState } from "react";

export function useFormStatus() {
  const [isLoading, setIsLoading] = useState(false);
  return { isLoading, setIsLoading };
}
