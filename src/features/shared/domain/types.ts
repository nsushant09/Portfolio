export type RemoteData<T, E extends Error = Error> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: E };

export const remoteData = {
  idle<T, E extends Error = Error>(): RemoteData<T, E> {
    return { status: 'idle' };
  },
  loading<T, E extends Error = Error>(): RemoteData<T, E> {
    return { status: 'loading' };
  },
  success<T, E extends Error = Error>(data: T): RemoteData<T, E> {
    return { status: 'success', data };
  },
  error<T, E extends Error>(error: E): RemoteData<T, E> {
    return { status: 'error', error };
  },
} as const;
