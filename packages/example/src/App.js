import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal } from 'ant-design-draggable-modal'
import 'antd/dist/antd.css'

const ModalWithButton = () => {
    const [visible, setVisible] = useState(true)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    return (
        <>
            <Button onClick={onOk}>Open</Button>
            <DraggableModal visible={visible} onOk={onOk} onCancel={onCancel}>
                Body text.
            </DraggableModal>
        </>
    )
}

const App = () => (
    <>
        <ModalWithButton />
    </>
)

export default App
