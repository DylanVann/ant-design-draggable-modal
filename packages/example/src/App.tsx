import React, { useState, useCallback } from 'react'
import { Button, Layout, Breadcrumb } from 'antd'
import {
    DraggableModal,
    DraggableModalProvider,
    DraggableModalProps,
} from 'ant-design-draggable-modal'
import 'antd/dist/reset.css'
import 'ant-design-draggable-modal/dist/index.css'

const { Content, Footer } = Layout

interface ModalWithButtonProps extends DraggableModalProps {
    title: string
}

function ModalWithButton(props: ModalWithButtonProps) {
    const [open, setOpen] = useState(false)
    const onOk = useCallback(() => setOpen(true), [])
    const onCancel = useCallback(() => setOpen(false), [])
    const onToggle = useCallback(() => setOpen(v => !v), [])
    return (
        <>
            <Button onClick={onToggle} type={open ? 'danger' : undefined} style={{ margin: 10 }}>
                {open ? `Close ${props.title}` : `Open ${props.title}`}
            </Button>
            <DraggableModal open={open} onOk={onOk} onCancel={onCancel} {...props}>
                Body text.
            </DraggableModal>
        </>
    )
}

const App = () => (
    <DraggableModalProvider>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: "Ant Design" }, { title: "Draggable Modal" }]} />
                <div style={{ background: '#fff', padding: 24 }}>
                    <ModalWithButton title="Modal A" />
                    <ModalWithButton title="Modal B" initialWidth={200} initialHeight={100} />
                    <ModalWithButton title="Modal C" />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <a href="https://github.com/DylanVann/ant-design-draggable-modal">GitHub</a>
                {' | '}
                <a href="https://twitter.com/atomarranger">@atomarranger</a>
            </Footer>
        </Layout>
    </DraggableModalProvider>
)

export default App
