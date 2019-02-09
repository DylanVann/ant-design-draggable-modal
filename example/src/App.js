import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal } from 'antd-draggable-modal'
import 'antd/dist/antd.css'

const ModalWithButton = () => {
    const [visible, setVisible] = useState(true)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    const props = {
        visible,
        onOk,
        onCancel,
    }
    return (
        <>
            <Button onClick={onOk}>Open</Button>
            <DraggableModal {...props}>Body text.</DraggableModal>
        </>
    )
}

const App = () => (
    <>
        <ModalWithButton />
    </>
)

export default App
