type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

type LastOf<U> = UnionToIntersection<
  U extends unknown ? () => U : never
> extends () => infer R
  ? R
  : never;

type UnionToTuple<T, L = LastOf<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

type Tuple = UnionToTuple<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>;

export const tuple: Tuple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
