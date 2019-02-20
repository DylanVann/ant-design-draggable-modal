<h1 align="center">Ant Design Draggable Modal</h1>

<div align="center">

Modal from Ant Design, draggable.

[![NPM](https://img.shields.io/npm/v/ant-design-draggable-modal.svg)](https://www.npmjs.com/package/ant-design-draggable-modal)
[![BundlePhobia](https://img.shields.io/bundlephobia/minzip/ant-design-draggable-modal.svg?style=flat)](https://bundlephobia.com/result?p=ant-design-draggable-modal)

</div>

<div align="center">
<a href="https://distracted-hugle-66cb55.netlify.com/">
<img src="https://user-images.githubusercontent.com/1537615/52606003-06002180-2e3f-11e9-83f2-21fc6212924a.gif" alt="Example of ant-design-draggable-modal.">
</a>
</div>

## 🌎 [Example](https://distracted-hugle-66cb55.netlify.com/)

## ✨ Features

-   [x] Drag with title bar.
-   [x] Resize with handle.
-   [x] Keep in bounds.
    -   [x] During drag.
    -   [x] During resize.
    -   [x] During resize window.
-   [x] Multiple modals with managed `zIndex`.
-   [x] Open from center.
-   [ ] Better API for using as a controlled component.
-   [ ] Open from quadrants.
-   [ ] Better escape key management.
-   [ ] Resize with option key.

## 📦 Install

```bash
yarn add ant-design-draggable-modal
```

NOTE: You must use `react@16.8.0` and `react-dom@16.8.0` or higher.

## 🔨 Usage

```tsx
import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'antd/dist/antd.css'
import 'ant-design-draggable-modal/dist/index.css'

const ModalWithButton = () => {
    const [visible, setVisible] = useState(false)
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

// DraggableModalProvider manages the zIndex
// of DraggableModals rendered beneath it.
const App = () => (
    <DraggableModalProvider>
        <ModalWithButton />
        <ModalWithButton />
        <ModalWithButton />
    </DraggableModalProvider>
)
```

## ⚠️ User Experience Warning

You should probably try to design your app not to need to use this, apps should usually not be window managers.

## License

MIT © [DylanVann](https://github.com/DylanVann)
