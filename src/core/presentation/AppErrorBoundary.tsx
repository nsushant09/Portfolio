import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

type AppErrorBoundaryState =
  | { readonly hasError: false }
  | { readonly hasError: true; readonly error: Error };

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  override state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled application rendering error', { error, componentStack: info.componentStack });
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <main className="grid min-h-screen place-items-center bg-stone-950 px-6 text-stone-100" role="alert">
          <section className="max-w-lg text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-lime-300">Application error</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">The page could not be displayed.</h1>
            <p className="mt-3 text-sm text-stone-400">{this.state.error.message}</p>
            <button
              className="mt-7 rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload page
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
