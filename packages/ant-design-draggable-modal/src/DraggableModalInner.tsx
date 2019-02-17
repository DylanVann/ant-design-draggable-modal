import * as React from 'react'
import { useEffect, useMemo, useCallback } from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { ResizeHandle } from './ResizeHandle'
import { useDrag } from './useDrag'
import { DraggableModalContextMethods } from './DraggableModalContext'
import { usePrevious } from './usePrevious'
import { ModalID, ModalState } from './draggableModalReducer'
import { useResize } from './useResize'

const modalStyle: React.CSSProperties = { margin: 0, paddingBottom: 0, pointerEvents: 'auto' }
const headerStyle: React.CSSProperties = { cursor: 'move' }

export type DraggableModalInnerProps = ModalProps & { children?: React.ReactNode }

interface ContextProps extends DraggableModalContextMethods {
    id: ModalID
    modalState: ModalState
}

export const DraggableModalInner = React.memo((props: DraggableModalInnerProps & ContextProps) => {
    const { onMount, onUnmount, onVisible, onResize, onDrag, modalState, id } = props

    // Call on mount and unmount.
    useEffect(() => {
        onMount(id)
        return () => onUnmount(id)
    }, [onMount, id, onUnmount])

    // Bring this to the front if it's been opened with props.
    const { visible } = props
    const visiblePrevious = usePrevious(visible)
    useEffect(() => {
        if (visible && !visiblePrevious) {
            onVisible(id)
        }
    }, [visible, visiblePrevious, onVisible, id])

    const { zIndex, x, y, width, height } = modalState

    const style: React.CSSProperties = useMemo(() => ({ ...modalStyle, top: y, left: x, height }), [
        y,
        x,
        height,
    ])

    const onVisibleWithID = useCallback(() => onVisible(id), [id, onVisible])
    const onDragWithID = useCallback((x: number, y: number) => onDrag(id, x, y), [onDrag, id])
    const onResizeWithID = useCallback(
        (x: number, y: number, width: number, height: number) => onResize(id, x, y, width, height),
        [onResize, id],
    )

    const onMouseDrag = useDrag(x, y, onDragWithID)
    const onMouseResize = useResize(x, y, width, height, onResizeWithID)

    return (
        <Modal
            wrapClassName="ant-design-draggable-modal"
            style={style}
            width={width}
            destroyOnClose={true}
            mask={false}
            maskClosable={false}
            zIndex={zIndex}
            title={
                <div style={headerStyle} onMouseDown={onMouseDrag} onClick={onVisibleWithID}>
                    Title
                </div>
            }
            {...props}
        >
            {props.children}
            <ResizeHandle onMouseDown={onMouseResize} />
        </Modal>
    )
})

DraggableModalInner.displayName = 'DraggableModalInner'
