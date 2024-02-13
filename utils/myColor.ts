// @ts-ignore
import tinycolor from "tinycolor2";

export const getReadability = (t1: string, t2: string): number => {
  return tinycolor.readability(t1, t2);
};
