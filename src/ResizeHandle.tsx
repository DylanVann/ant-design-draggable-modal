import * as React from 'react'

const containerStyle: React.CSSProperties = {
    position: 'absolute',
    right: -10,
    bottom: -10,
    cursor: 'se-resize',
    width: 44,
    height: 44,
}

const handleStyle: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid grey',
    borderTop: 0,
    borderLeft: 0,
    width: 12,
    height: 12,
    right: 14,
    bottom: 14,
}

export const ResizeHandle = (props: any) => (
    <div style={containerStyle} {...props}>
        <div style={handleStyle} />
    </div>
)
