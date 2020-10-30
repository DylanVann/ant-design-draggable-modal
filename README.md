<h1 align="center">Ant Design Draggable Modal</h1>

<div align="center">

Modal from Ant Design, draggable.

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![BundlePhobia](https://img.shields.io/bundlephobia/minzip/ant-design-draggable-modal.svg?style=flat-square)](https://bundlephobia.com/result?p=ant-design-draggable-modal)
[![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

</div>

<div align="center">
<a href="https://distracted-hugle-66cb55.netlify.com/">
<img src="https://user-images.githubusercontent.com/1537615/52606003-06002180-2e3f-11e9-83f2-21fc6212924a.gif" alt="Example of ant-design-draggable-modal.">
</a>
</div>

## 🌎 [Example](https://ant-design-draggable-modal.netlify.app/)

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

<!--
Links:
-->

<!-- prettier-ignore-start -->

[downloads-badge]: https://img.shields.io/npm/dm/ant-design-draggable-modal.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/ant-design-draggable-modal
[package]: https://www.npmjs.com/package/ant-design-draggable-modal
[version-badge]: https://img.shields.io/npm/v/ant-design-draggable-modal.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/ant-design-draggable-modal.svg?style=flat-square
[license]: https://github.com/dylanvann/ant-design-draggable-modal/blob/master/LICENSE
[twitter]: https://twitter.com/home?status=Check%20out%20ant-design-draggable-modal%20by%20%40atomarranger%20https%3A//github.com/DylanVann/ant-design-draggable-modal
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/DylanVann/ant-design-draggable-modal.svg?style=social
[github-watch-badge]: https://img.shields.io/github/watchers/dylanvann/ant-design-draggable-modal.svg?style=social
[github-watch]: https://github.com/dylanvann/ant-design-draggable-modal/watchers
[github-star-badge]: https://img.shields.io/github/stars/dylanvann/ant-design-draggable-modal.svg?style=social
[github-star]: https://github.com/dylanvann/ant-design-draggable-modal/stargazers

<!-- prettier-ignore-end -->
