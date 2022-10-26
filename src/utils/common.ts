export const isBrowser = (): boolean => typeof window !== "undefined";

export const getFirstIfArray = <T>(obj: T | T[]): T =>
  Array.isArray(obj) ? obj[0] : obj;

// Fisher–Yates shuffle Algorithm
export const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
