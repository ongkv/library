import { BookCatalogueAddFormInputsDTO } from "../types/DTO/bookCatalogue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export async function createBookRequest(
  url: string,
  { arg }: { arg: BookCatalogueAddFormInputsDTO },
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
