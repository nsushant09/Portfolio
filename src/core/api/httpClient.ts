import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

export interface ApiErrorPayload {
  message: string;
  code: string;
  status: number | null;
  details: unknown;
}

export class HttpClientError extends Error implements ApiErrorPayload {
  readonly code: string;
  readonly status: number | null;
  readonly details: unknown;

  constructor(payload: ApiErrorPayload, options?: ErrorOptions) {
    super(payload.message, options);
    this.name = 'HttpClientError';
    this.code = payload.code;
    this.status = payload.status;
    this.details = payload.details;
  }
}

export type AuthTokenProvider = () => string | null | Promise<string | null>;

let authTokenProvider: AuthTokenProvider = () => null;

export function setAuthTokenProvider(provider: AuthTokenProvider): void {
  authTokenProvider = provider;
}

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || undefined;

export const httpClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function readPayloadField(value: unknown, key: string): unknown {
  if (typeof value !== 'object' || value === null || !(key in value)) return undefined;
  return Reflect.get(value, key);
}

function normalizeAxiosError(error: AxiosError<unknown>): HttpClientError {
  const status = error.response?.status ?? null;
  const responseData: unknown = error.response?.data;
  const messageValue = readPayloadField(responseData, 'message');
  const codeValue = readPayloadField(responseData, 'code');
  const message = typeof messageValue === 'string'
    ? messageValue
    : status === null
      ? error.message || 'The request could not reach the server.'
      : `The server returned HTTP ${status}.`;

  return new HttpClientError({
    message,
    code: typeof codeValue === 'string' ? codeValue : error.code ?? 'HTTP_REQUEST_FAILED',
    status,
    details: readPayloadField(responseData, 'details') ?? responseData,
  }, { cause: error });
}

export function normalizeHttpError(error: unknown): HttpClientError {
  if (axios.isAxiosError<unknown>(error)) return normalizeAxiosError(error);
  if (error instanceof HttpClientError) return error;
  if (error instanceof Error) {
    return new HttpClientError({
      message: error.message,
      code: 'UNEXPECTED_ERROR',
      status: null,
      details: null,
    }, { cause: error });
  }
  return new HttpClientError({
    message: 'An unexpected error occurred.',
    code: 'UNEXPECTED_ERROR',
    status: null,
    details: error,
  });
}

httpClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await authTokenProvider();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  else config.headers.delete('Authorization');
  return config;
});

httpClient.interceptors.response.use(
  response => response,
  (error: unknown) => Promise.reject(normalizeHttpError(error)),
);
