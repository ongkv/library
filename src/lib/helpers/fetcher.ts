import { Fetcher } from "swr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher: Fetcher<any, string> = (...args) =>
  fetch(...args).then((res) => res.json());
