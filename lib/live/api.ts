export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const action = body as { requestId?: unknown } | undefined;
  const canRetry = body === undefined || url === "/api/live/answer" || url === "/api/live/typing"
    || (url === "/api/live/host" && typeof action?.requestId === "string");
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: body === undefined ? "GET" : "POST", credentials: "same-origin", cache: "no-store", signal,
        headers: body === undefined ? undefined : { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new ApiError(typeof data?.message === "string" ? data.message : typeof data?.error === "string" ? data.error : "We could not complete that. Please try again.", response.status);
      return data as T;
    } catch (error) {
      if (signal?.aborted) throw error;
      const rejected = error instanceof ApiError && error.status < 500;
      if (!canRetry || rejected || attempt === 2) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Connection interrupted. Keep this page open, then try again.", 503);
      }
      await new Promise(resolve => setTimeout(resolve, 400 * (attempt + 1) + Math.random() * 300));
    }
  }
  throw new ApiError("Connection interrupted. Please try again.", 503);
}
