import { getCookie, removeCookie } from "typescript-cookie";

type ApiResponseType<T> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: string;
    };

type FetchOptionsType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: Record<string, string>;
  body?: string;
};

export async function RestRequest<R>(
  path: string,
  params: unknown,
  method: FetchOptionsType["method"],
  contentType: string
): Promise<ApiResponseType<R>> {
  try {
    const session_id = getCookie("session_id") ?? "";
    const headers = {
      "Content-Type": contentType,
      session_id,
    };

    const fetchOptions: FetchOptionsType = {
      method: method,
      headers: headers,
      body: params ? JSON.stringify(params) : "",
    };
    if (method === "GET") delete fetchOptions["body"];

    const response = await fetch(`/api/${path}`, fetchOptions);
    if (response.status === 401) {
      removeCookie("session_id");
      window.location.assign("/signin");
    }
    // eslint-disable-next-line
    const parsedResponse = await response.json();

    return parsedResponse;
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Unknown error. Please try again",
    };
  }
}
