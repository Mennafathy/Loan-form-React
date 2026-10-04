import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.fallbackContainer} role="alert">
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <AlertTriangle size={32} />
            </div>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>
              An unexpected error occurred while rendering this view.
            </p>
            {this.state.error && (
              <pre className={styles.errorDetails}>
                {this.state.error.message}
              </pre>
            )}
            <Button
              variant="primary"
              onClick={this.handleReset}
              icon={<RefreshCw size={16} />}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
