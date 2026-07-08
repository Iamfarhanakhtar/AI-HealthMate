import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="glass-panel max-w-md p-8 rounded-2xl border border-red-500/20 text-center shadow-xl">
            <span className="material-symbols-outlined text-red-400 text-5xl mb-4">
              running_with_errors
            </span>
            <h2 className="text-xl font-bold text-secondary">Something went wrong</h2>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              An unexpected error occurred in this view. Please try reloading the page or go back.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-bold hover:bg-red-500/20 transition-all active:scale-95 cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
