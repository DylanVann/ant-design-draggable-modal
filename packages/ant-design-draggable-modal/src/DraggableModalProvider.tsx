import * as React from 'react'
import { useCallback, useEffect, useReducer } from 'react'
import { DraggableModalContext } from './DraggableModalContext'
import { getWindowSize } from './getWindowSize'
import { draggableModalReducer, initialModalsState, ModalID } from './draggableModalReducer'

export const DraggableModalProvider = ({
    children,
}: {
    children: React.ReactNode
}): React.ReactElement => {
    const [state, dispatch] = useReducer(draggableModalReducer, initialModalsState)

    useEffect(() => {
        if (typeof window !== 'object') {
            return
        }
        const onResize = (): void => dispatch({ type: 'windowResize', size: getWindowSize() })
        window.addEventListener('resize', onResize)
        onResize()
        return () => window.removeEventListener('resize', onResize)
    }, [dispatch])

    const value = {
        state,
        onVisible: useCallback((id: ModalID) => dispatch({ type: 'visible', id }), [dispatch]),
        onMount: useCallback((id: ModalID) => dispatch({ type: 'mount', id }), [dispatch]),
        onUnmount: useCallback((id: ModalID) => dispatch({ type: 'unmount', id }), [dispatch]),
        onDrag: useCallback((id: ModalID, x, y) => dispatch({ type: 'drag', id, x, y }), [
            dispatch,
        ]),
        onResize: useCallback(
            (id: ModalID, x, y, width, height) =>
                dispatch({ type: 'resize', id, x, y, width, height }),
            [dispatch],
        ),
    }
    return <DraggableModalContext.Provider value={value}>{children}</DraggableModalContext.Provider>
}
