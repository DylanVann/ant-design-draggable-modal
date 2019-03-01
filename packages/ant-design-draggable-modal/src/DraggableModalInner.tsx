import * as React from 'react'
import { useEffect, useMemo, useCallback, memo } from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { ResizeHandle } from './ResizeHandle'
import { useDrag } from './useDrag'
import { DraggableModalContextMethods } from './DraggableModalContext'
import { usePrevious } from './usePrevious'
import { ModalID, ModalState } from './draggableModalReducer'
import { useResize } from './useResize'

const modalStyle: React.CSSProperties = { margin: 0, paddingBottom: 0, pointerEvents: 'auto' }

interface ContextProps extends DraggableModalContextMethods {
    id: ModalID
    modalState: ModalState
}

export type DraggableModalInnerProps = ModalProps & { children?: React.ReactNode } & ContextProps

export const DraggableModalInner = memo(
    ({ id, modalState, dispatch, visible, children, ...otherProps }: DraggableModalInnerProps) => {
        // Call on mount and unmount.
        useEffect(() => {
            dispatch({ type: 'mount', id })
            return () => dispatch({ type: 'unmount', id })
        }, [dispatch, id])

        // Bring this to the front if it's been opened with props.
        const visiblePrevious = usePrevious(visible)
        useEffect(() => {
            if (visible !== visiblePrevious) {
                if (visible) {
                    dispatch({ type: 'show', id })
                } else {
                    dispatch({ type: 'hide', id })
                }
            }
        }, [visible, visiblePrevious, id, dispatch])

        const { zIndex, x, y, width, height } = modalState

        const style: React.CSSProperties = useMemo(
            () => ({ ...modalStyle, top: y, left: x, height }),
            [y, x, height],
        )

        const onFocus = useCallback(() => dispatch({ type: 'focus', id }), [id, dispatch])

        const onDragWithID = useCallback(args => dispatch({ type: 'drag', id, ...args }), [
            dispatch,
            id,
        ])

        const onResizeWithID = useCallback(args => dispatch({ type: 'resize', id, ...args }), [
            dispatch,
            id,
        ])

        const onMouseDrag = useDrag(x, y, onDragWithID)
        const onMouseResize = useResize(x, y, width, height, onResizeWithID)

        const title = useMemo(
            () => (
                <div
                    className="ant-design-draggable-modal-title"
                    onMouseDown={onMouseDrag}
                    onClick={onFocus}
                >
                    Title
                </div>
            ),
            [onMouseDrag, onFocus],
        )

        return (
            <Modal
                wrapClassName="ant-design-draggable-modal"
                style={style}
                width={width}
                destroyOnClose={true}
                mask={false}
                maskClosable={false}
                zIndex={zIndex}
                title={title}
                visible={visible}
                {...otherProps}
            >
                {children}
                <ResizeHandle onMouseDown={onMouseResize} />
            </Modal>
        )
    },
)

DraggableModalInner.displayName = 'DraggableModalInner'
