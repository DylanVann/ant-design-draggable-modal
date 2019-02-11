import { useState, useEffect, useCallback } from 'react'

export const useImagineDraggin = (
    x: number,
    setX: (v: number) => void,
    y: number,
    setY: (v: number) => void,
    dragging: boolean,
    setDragging: (v: boolean) => void,
) => {
    const [initialDragState, setInitialDragState] = useState({
        initX: 0,
        initY: 0,
        firstX: 0,
        firstY: 0,
    })

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            setInitialDragState({
                initX: x,
                initY: y,
                firstX: e.clientX,
                firstY: e.clientY,
            })
            setDragging(true)
        },
        [x, y, setDragging],
    )

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dragging) {
                const { initX, firstX, initY, firstY } = initialDragState
                setX(initX + e.clientX - firstX)
                setY(initY + e.clientY - firstY)
            }
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [initialDragState, dragging, setX, setY])

    useEffect(() => {
        const onMouseUp = () => {
            setDragging(false)
        }
        window.addEventListener('mouseup', onMouseUp)
        return () => window.removeEventListener('mouseup', onMouseUp)
    }, [setDragging])

    return onMouseDown
}
