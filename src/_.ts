type RecurseSub<T> = T extends { __rec: { __rec: infer U } }
  ? { __rec: RecurseSub<U> }
  : T extends { __rec: infer U }
  ? U
  : T;

type Recurse<T> = T extends { __rec: unknown } ? Recurse<RecurseSub<T>> : T;

type MakeTupleByLengthCore<
  Length,
  Tuple extends never[] = []
> = Tuple["length"] extends Length
  ? Tuple
  : { __rec: MakeTupleByLengthCore<Length, [...Tuple, never]> };

type MakeTupleByLength<Length> = Extract<
  Recurse<MakeTupleByLengthCore<Length>>,
  never[]
>;

type DecrementTupleLength<A extends never[]> = A extends [
  infer _,
  ...infer Rest
]
  ? Extract<Rest, never[]>
  : never;

type MulTupleLengthCore<
  A extends never[],
  B extends never[],
  Result extends never[] = []
> = B["length"] extends 0
  ? Result["length"]
  : {
      __rec: MulTupleLengthCore<A, DecrementTupleLength<B>, [...Result, ...A]>;
    };

type MulTupleLength<A extends never[], B extends never[]> = Recurse<
  MulTupleLengthCore<A, B>
>;

type Mul<A, B> = MulTupleLength<MakeTupleByLength<A>, MakeTupleByLength<B>>;

export type _ = Mul<6, 7>;
