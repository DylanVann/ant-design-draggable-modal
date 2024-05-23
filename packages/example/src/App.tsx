import { DraggableModal, DraggableModalProps, DraggableModalProvider } from '@cubetiq/antd-modal'
import '@cubetiq/antd-modal/dist/index.css'
import { Breadcrumb, Button, Layout } from 'antd'
import { useCallback, useState } from 'react'

const { Content, Footer } = Layout

interface ModalWithButtonProps extends DraggableModalProps {
    title: string
}

function ModalWithButton(props: ModalWithButtonProps) {
    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    const onToggle = useCallback(() => setVisible((v) => !v), [])
    return (
        <>
            <Button onClick={onToggle} type={visible ? 'dashed' : 'primary'} style={{ margin: 10 }}>
                {visible ? `Close ${props.title}` : `Open ${props.title}`}
            </Button>
            <DraggableModal open={visible} onOk={onOk} onCancel={onCancel} {...props}>
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
                    <ModalWithButton title="Modal B" initialWidth={500} initialHeight={100} />
                    <ModalWithButton title="Modal C" />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <a href="https://github.com/sombochea/antd-modal">GitHub</a>
            </Footer>
        </Layout>
    </DraggableModalProvider>
)

export default App
