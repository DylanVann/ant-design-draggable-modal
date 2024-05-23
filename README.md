<h1 align="center">Ant Design Draggable Modal</h1>

<div align="center">

Modal from Ant Design, draggable, resizable.

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![BundlePhobia](https://img.shields.io/bundlephobia/minzip/@cubetiq/antd-modal.svg?style=flat-square)](https://bundlephobia.com/result?p=@cubetiq/antd-modal)
[![MIT License][license-badge]][license]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

</div>

<div align="center">
<!-- <a href="https://distracted-hugle-66cb55.netlify.com/"> -->
<img src="https://user-images.githubusercontent.com/1537615/52606003-06002180-2e3f-11e9-83f2-21fc6212924a.gif" alt="Example of @cubetiq/antd-modal.">
</a>
</div>

## 🌎 Example

## Required

-   Ant Design 5.x
-   React 18.x

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

## ✨ Enhancements

-   [x] Ant Design 5.x
-   [ ] Modal `visible` to `open`

## 📦 Install

```bash
yarn add @cubetiq/antd-modal
```

NOTE: You must use `react@18` and `react-dom@18` or higher and `antd@5` or higher.

## 🔨 Usage

```tsx
import { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from '@cubetiq/antd-modal'
import '@cubetiq/antd-modal/dist/index.css'

const ModalWithButton = () => {
    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])
    return (
        <>
            <Button onClick={onOk}>Open</Button>
            <DraggableModal open={visible} onOk={onOk} onCancel={onCancel}>
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

#### Enhanced for Ant Design 5.x by [Sambo Chea](https://github.com/sombochea)

<!--
Links:
-->

<!-- prettier-ignore-start -->

[downloads-badge]: https://img.shields.io/npm/dm/@cubetiq/antd-modal.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/@cubetiq/antd-modal
[package]: https://www.npmjs.com/package/@cubetiq/antd-modal
[version-badge]: https://img.shields.io/npm/v/@cubetiq/antd-modal.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@cubetiq/antd-modal.svg?style=flat-square
[license]: https://github.com/sombochea/antd-modal/blob/main/LICENSE
[github-watch-badge]: https://img.shields.io/github/watchers/sombochea/antd-modal.svg?style=social
[github-watch]: https://github.com/sombochea/antd-modal/watchers
[github-star-badge]: https://img.shields.io/github/stars/sombochea/antd-modal.svg?style=social
[github-star]: https://github.com/sombochea/antd-modal/stargazers

<!-- prettier-ignore-end -->
