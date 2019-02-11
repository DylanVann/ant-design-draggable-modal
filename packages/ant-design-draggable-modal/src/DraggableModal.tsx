import * as React from 'react'
import { useState, useLayoutEffect } from 'react'
import cxs from 'cxs'
import { Modal } from 'antd'
import { useWindowSize } from './useWindowSize'
import { ResizeHandle } from './ResizeHandle'
import { useImagineDraggin } from './useImagineDraggin'
import { clamp } from './clamp'

// Wish there was a better way.
const className = cxs({
    pointerEvents: 'none',
    overflow: 'hidden',
    ' > .ant-modal': {
        display: 'flex',
        maxWidth: 'none',
    },
    ' > .ant-modal > .ant-modal-content': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    ' > .ant-modal > .ant-modal-content > .ant-modal-body': {
        flex: 1,
        overflowY: 'auto',
    },
    ' > .ant-modal > .ant-modal-content > .ant-modal-footer': {
        padding: '16px',
    },
})

export type DraggableModalProps = any

export const DraggableModal = (props: DraggableModalProps) => {
    const [dragging, setDragging] = useState(false)
    const [resizing, setResizing] = useState(false)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(300)

    const onMouseDownDrag = useImagineDraggin(left, setLeft, top, setTop, dragging, setDragging)
    const onMouseDownResize = useImagineDraggin(
        width,
        setWidth,
        height,
        setHeight,
        resizing,
        setResizing,
    )

    // All the logic to keep the modal within bounds.
    const { width: windowWidth, height: windowHeight } = useWindowSize()
    useLayoutEffect(() => {
        if (windowWidth === undefined) return
        if (windowHeight === undefined) return

        // We try to push it over.
        const maxLeft = windowWidth - width
        const maxTop = windowHeight - height
        const newLeft = clamp(0, maxLeft, left)
        const newTop = clamp(0, maxTop, top)
        setLeft(newLeft)
        setTop(newTop)

        // If that's not enough then resize too.
        const maxWidth = windowWidth - newLeft
        const maxHeight = windowHeight - newTop
        setWidth(clamp(200, maxWidth, width))
        setHeight(clamp(200, maxHeight, height))
    }, [windowWidth, windowHeight, top, left, width, height, dragging, resizing])
    return (
        <Modal
            wrapClassName={className}
            style={{ margin: 0, paddingBottom: 0, top, left, height, pointerEvents: 'auto' }}
            destroyOnClose={true}
            width={width}
            mask={false}
            maskClosable={false}
            title={
                <div style={{ cursor: 'move' }} onMouseDown={onMouseDownDrag}>
                    Title
                </div>
            }
            {...props}
        >
            {props.children}
            <ResizeHandle onMouseDown={onMouseDownResize} />
        </Modal>
    )
}
