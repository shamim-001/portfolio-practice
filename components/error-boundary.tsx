"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { isClient } from "@/lib/environment"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorStack?: string
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorStack: error.stack,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo)
    this.setState({ errorInfo })

    // You could send this to an error reporting service
    // Example: sendToErrorReportingService(error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorStack: undefined })
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in duration-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                this.resetErrorBoundary()
                if (isClient) {
                  window.location.reload()
                }
              }}
            >
              Reload page
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                this.resetErrorBoundary()
                if (isClient) {
                  window.history.back()
                }
              }}
            >
              Go back
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.errorStack && (
            <details className="mt-6 text-left w-full">
              <summary className="cursor-pointer text-sm font-medium">Error details</summary>
              <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-4 text-xs">{this.state.errorStack}</pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode,
): React.FC<P> {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

