# ant-design-draggable-modal

> Modal from Ant Design, draggable.

[![NPM](https://img.shields.io/npm/v/ant-design-draggable-modal.svg)](https://www.npmjs.com/package/ant-design-draggable-modal)
![](https://img.shields.io/bundlephobia/minzip/ant-design-draggable-modal.svg?style=flat)

[Example](https://distracted-hugle-66cb55.netlify.com/)

## Install

```bash
yarn add ant-design-draggable-modal
```

## Usage

```tsx
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
```

## License

MIT © [DylanVann](https://github.com/DylanVann)
