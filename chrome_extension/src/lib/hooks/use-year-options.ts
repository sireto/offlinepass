import { useMemo } from "react";

export const useYearOptions = (startYear = 2022, futureBuffer = 2) => {
  const currentYear = new Date().getFullYear();

  return useMemo(() => {
    const options: string[] = [];
    for (let year = startYear; year <= currentYear + futureBuffer; year++) {
      options.push(year.toString());
    }
    return options;
  }, [startYear, futureBuffer, currentYear]);
};
