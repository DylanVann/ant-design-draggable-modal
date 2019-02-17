import * as React from 'react'
import { useContext } from 'react'
import { useUID } from 'react-uid'
import { DraggableModalContext } from './DraggableModalContext'
import { DraggableModalInner, DraggableModalInnerProps } from './DraggableModalInner'
import { getModalState } from './draggableModalReducer'
import './DraggableModal.css'

export const DraggableModal = (props: DraggableModalInnerProps): React.ReactElement => {
    // Get the unique ID of this modal.
    const id = useUID()

    // Get modal provider.
    const modalProvider = useContext(DraggableModalContext)
    if (!modalProvider) {
        throw new Error('Must be under DraggableModalProvider.')
    }

    const { onMount, onUnmount, onVisible, onResize, onDrag, state } = modalProvider
    const modalState = getModalState(state, id)

    // We do this so that we don't re-render all modals for every state change.
    // DraggableModalInner uses React.memo, so it only re-renders if
    // if props change (e.g. modalState).
    return (
        <DraggableModalInner
            id={id}
            onMount={onMount}
            onUnmount={onUnmount}
            onVisible={onVisible}
            onResize={onResize}
            onDrag={onDrag}
            modalState={modalState}
            {...props}
        />
    )
}
