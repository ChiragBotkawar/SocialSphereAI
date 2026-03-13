import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div
          style={{
            padding: '2rem',
            fontFamily: 'monospace',
            background: '#111',
            color: '#f87171',
            minHeight: '100vh',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          <h1 style={{ color: '#fca5a5', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Application Error
          </h1>
          <strong>{error.message}</strong>
          <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
          <code style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{error.stack}</code>
        </div>
      );
    }
    return this.props.children;
  }
}
