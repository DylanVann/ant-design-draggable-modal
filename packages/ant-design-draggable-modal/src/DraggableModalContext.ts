import * as React from 'react'

export type DraggableModalContextValue = {
    state: { [key: string]: number }
    registerModal: (id: string) => void
    unregisterModal: (id: string) => void
    bringToFront: (id: string) => void
}

export const DraggableModalContext = React.createContext<DraggableModalContextValue>(
    undefined as any,
)
