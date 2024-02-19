export type ResponseType<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

export function SuccessResponse<T>(data: T) {
  return {
    success: true,
    error: null,
    data: data,
  };
}

export function ErrorResponse(error: string) {
  return {
    success: false,
    error: error,
    data: null,
  };
}
