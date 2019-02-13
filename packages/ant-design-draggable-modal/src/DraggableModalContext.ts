import * as React from 'react'

export type DraggableModalContextValue = {
    state: { maxZIndex: number; modals: { [key: string]: number } }
    registerModal: (id: string) => void
    unregisterModal: (id: string) => void
    focus: (id: string) => void
}

export const DraggableModalContext = React.createContext<DraggableModalContextValue>(
    undefined as any,
)
