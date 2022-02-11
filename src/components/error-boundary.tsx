import React, { ReactNode } from "react";

type FallbackRender = (props: { err: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {err: Error | null}> {
    state = {err: null}

    // when sub-comp raise an Error, it'd be passed here and activated
    static getDerivedStateFromError(err: Error) {
        return {err}
    }

    render(): React.ReactNode {
        const { err } = this.state
        const { fallbackRender, children } = this.props
        if (err) {
            return fallbackRender({err})
        } 
        return children
    }
}