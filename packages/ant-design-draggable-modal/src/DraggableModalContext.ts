import * as React from 'react'
import { ModalsState } from './draggableModalReducer'

export interface DraggableModalContextMethods {
    onVisible: (id: string) => void
    onMount: (id: string) => void
    onUnmount: (id: string) => void
    onDrag: (id: string, x: number, y: number) => void
    onResize: (id: string, x: number, y: number, width: number, height: number) => void
}

export interface DraggableModalContextValue extends DraggableModalContextMethods {
    state: ModalsState
}

export const DraggableModalContext = React.createContext<DraggableModalContextValue | null>(null)
