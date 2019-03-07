import React, { useState, useCallback } from 'react'
import { Button, Layout, Breadcrumb } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'antd/dist/antd.css'
import 'ant-design-draggable-modal/dist/index.css'

const { Content, Footer } = Layout

const ModalWithButton = props => {
    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    const onToggle = useCallback(() => setVisible(v => !v), [])
    return (
        <>
            <Button onClick={onToggle} type={visible ? 'danger' : undefined} style={{ margin: 10 }}>
                {visible ? `Close ${props.title}` : `Open ${props.title}`}
            </Button>
            <DraggableModal visible={visible} onOk={onOk} onCancel={onCancel} {...props}>
                Body text.
            </DraggableModal>
        </>
    )
}

const App = () => (
    <DraggableModalProvider>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                    <Breadcrumb.Item>Draggable Modal</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24 }}>
                    <ModalWithButton title="Modal A" />
                    <ModalWithButton title="Modal B" />
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
