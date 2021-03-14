import * as React from 'react'
import { render } from '@testing-library/react'
import { ResizeHandle } from './ResizeHandle'

describe('should render correctly', () => {
    it('shoude render with resize', () => {
        const { container } = render(<ResizeHandle resize />)
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div
              class="ant-design-draggable-modal-resize-handle"
            >
              <div
                class="ant-design-draggable-modal-resize-handle-inner"
              />
            </div>
        `)
    })

    it('shoude render without resize', () => {
        const { container } = render(<ResizeHandle resize={false} />)
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div
              class="ant-design-draggable-modal--without-resize"
            >
              <div
                class="ant-design-draggable-modal-resize-handle-inner"
              />
            </div>
        `)
    })
})
