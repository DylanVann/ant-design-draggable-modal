import * as React from 'react'

interface ResizeHandleProps extends  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    resize?: boolean
}

export const ResizeHandle = ({resize = true, ...props}: ResizeHandleProps) => (
    <div className={resize ? 'ant-design-draggable-modal-resize-handle' : 'ant-design-draggable-modal--without-resize'} {...props}>
        <div className="ant-design-draggable-modal-resize-handle-inner" />
    </div>
)