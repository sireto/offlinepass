export function removeElementFromArray(array: any[], element: any) {
  const index = array.indexOf(element);
  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1);
  }
  return array;
}

export const toLowerCaseAllElement = (array: string[]) => {
  return array.map((value) => value.toLowerCase());
};
export const hideString = (val: string, isVisible: boolean) => {
  if (!isVisible) return "*".repeat(val.length);
  return val;
};
