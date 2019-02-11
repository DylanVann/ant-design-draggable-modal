<h1 align="center">Ant Design Draggable Modal</h1>

<div align="center">

Modal from Ant Design, draggable.

[![NPM](https://img.shields.io/npm/v/ant-design-draggable-modal.svg)](https://www.npmjs.com/package/ant-design-draggable-modal)
![](https://img.shields.io/bundlephobia/minzip/ant-design-draggable-modal.svg?style=flat)

</div>

<div align="center">
    <img src="https://user-images.githubusercontent.com/1537615/52587290-bb16e780-2e07-11e9-9d20-0d359816940e.gif" alt="Example of ant-design-draggable-modal.">
</div>

## 🌎 [Example](https://distracted-hugle-66cb55.netlify.com/)

## ✨ Features

-   [x] Drag with title bar.
-   [x] Resize with handle.
-   [x] Keep in bounds.
    -   [x] During drag.
    -   [x] During resize.
    -   [x] During resize window.
-   [ ] Open from quadrants.
-   [ ] Better escape key management.
-   [ ] Resize with option key.
-   [ ] Multiple modals with managed `zIndex`.

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

## Note

You should probably try to design your app not to need to use this, apps should usually not be window managers.

## License

MIT © [DylanVann](https://github.com/DylanVann)
