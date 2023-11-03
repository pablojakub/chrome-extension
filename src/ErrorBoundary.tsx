import React from 'react';
import addErrorToLog from './api/addLog.api';

class ErrorBoundary extends React.Component<{ children: React.ReactNode,fallback: React.ReactNode}> {

    state = { hasError: false }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log('💥 ErrorBoundary', error);
        console.log(error);
        addErrorToLog({ 
            date: new Date(),
            errorMessage: error.message,
            stack: error.stack === undefined ? 'Stack didnt provided' : error.stack,
        })
    }

    render() {
        if(this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

export default ErrorBoundary;