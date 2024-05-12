/* eslint-disable @typescript-eslint/no-explicit-any */
import React ,{Component}from "react";

export default class ErrorBoundary extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong</h1>;
        }

        return this.props.children;
    }
}