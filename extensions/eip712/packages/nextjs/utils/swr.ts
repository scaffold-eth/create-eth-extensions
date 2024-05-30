export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Error fetching data");
  }
  return data;
};

export const makeMutationFetcher =
  <T = Record<any, any>>(method: "POST" | "PUT" | "PATCH" | "DELETE") =>
  async (url: string, { arg }: { arg: T }) => {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(arg),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Error ${method.toLowerCase()}ing data`);
    }
    return data;
  };

export const postMutationFetcher = <T = Record<any, any>>(url: string, arg: { arg: T }) =>
  makeMutationFetcher<T>("POST")(url, arg);

export const patchMutationFetcher = <T = Record<any, any>>(url: string, arg: { arg: T }) =>
  makeMutationFetcher<T>("PATCH")(url, arg);
