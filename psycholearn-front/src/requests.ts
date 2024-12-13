export const serverUrl = "http://localhost:5000";

export const HttpPost = async (
  path: string,
  body: any,
  headers: HeadersInit = { "Content-Type": "application/json" },
): Promise<any> => {
  const options: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
    credentials: "include",
  };
  console.log(options);
  const res = await fetch(serverUrl + path, options);
  return await res.json();
};

export const HttpGet = async (
  path: string,
  headers: HeadersInit = { "Content-Type": "application/json" },
) => {
  const options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: { ...headers },
  };
  console.log(options);
  const res = await fetch(serverUrl + path, options);
  return await res.json();
};

export const HttpPostFile = async (
  path: string,
  body: any,
  headers: HeadersInit = {},
) => {
  const options: RequestInit = {
    method: "POST",
    headers: headers,
    body: body,
    credentials: "include",
  };
  console.log(options);
  let res = await fetch(serverUrl + path, options);
  return await res.json();
};

export const HttpGetFile = async (path: string, headers: HeadersInit) => {
  const options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: { ...headers },
  };
  console.log(options);
  return await fetch(serverUrl + path, options);
};
