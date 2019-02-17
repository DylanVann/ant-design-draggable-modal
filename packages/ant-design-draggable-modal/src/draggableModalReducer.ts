import { getWindowSize } from './getWindowSize'
import { clamp } from './clamp'

// ID for a specific modal.
export type ModalID = string

// State for a specific modal.
export interface ModalState {
    x: number
    y: number
    width: number
    height: number
    zIndex: number
}

// State of all modals.
export interface ModalsState {
    maxZIndex: number
    windowSize: {
        width: number
        height: number
    }
    modals: {
        [key: string]: ModalState
    }
}

export const initialModalsState: ModalsState = {
    maxZIndex: 0,
    windowSize: getWindowSize(),
    modals: {},
}

export const initialModalState: ModalState = {
    x: 0,
    y: 0,
    width: 500,
    height: 300,
    zIndex: 0,
}

type Action =
    | { type: 'visible'; id: ModalID }
    | { type: 'unmount'; id: ModalID }
    | { type: 'mount'; id: ModalID }
    | { type: 'windowResize'; size: { width: number; height: number } }
    | { type: 'drag'; id: ModalID; x: number; y: number }
    | {
          type: 'resize'
          id: ModalID
          x: number
          y: number
          width: number
          height: number
      }

export const getModalState = (state: ModalsState, id: ModalID): ModalState =>
    state.modals[id] || initialModalState

const getNextZIndex = (state: ModalsState, id: string): number =>
    getModalState(state, id).zIndex === state.maxZIndex ? state.maxZIndex : state.maxZIndex + 1

const clampDrag = (
    windowWidth: number,
    windowHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
): { x: number; y: number } => {
    const maxX = windowWidth - width
    const maxY = windowHeight - height
    const clampedX = clamp(0, maxX, x)
    const clampedY = clamp(0, maxY, y)
    return { x: clampedX, y: clampedY }
}

const clampResize = (
    windowWidth: number,
    windowHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
): { width: number; height: number } => {
    const maxWidth = windowWidth - x
    const maxHeight = windowHeight - y
    const clampedWidth = clamp(200, maxWidth, width)
    const clampedHeight = clamp(200, maxHeight, height)
    return { width: clampedWidth, height: clampedHeight }
}

export const draggableModalReducer = (state: ModalsState, action: Action): ModalsState => {
    switch (action.type) {
        case 'resize':
            const size = clampResize(
                state.windowSize.width,
                state.windowSize.height,
                action.x,
                action.y,
                action.width,
                action.height,
            )
            return {
                ...state,
                maxZIndex: getNextZIndex(state, action.id),
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...state.modals[action.id],
                        ...size,
                        zIndex: getNextZIndex(state, action.id),
                    },
                },
            }
        case 'drag':
            return {
                ...state,
                maxZIndex: getNextZIndex(state, action.id),
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...state.modals[action.id],
                        ...clampDrag(
                            state.windowSize.width,
                            state.windowSize.height,
                            action.x,
                            action.y,
                            state.modals[action.id].width,
                            state.modals[action.id].height,
                        ),
                        zIndex: getNextZIndex(state, action.id),
                    },
                },
            }
        case 'visible':
            return {
                ...state,
                maxZIndex: state.maxZIndex + 1,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...initialModalState,
                        ...state.modals[action.id],
                        zIndex: state.maxZIndex + 1,
                    },
                },
            }
        case 'mount':
            return {
                ...state,
                maxZIndex: state.maxZIndex + 1,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...initialModalState,
                        x: state.windowSize.width / 2 - initialModalState.width / 2,
                        y: state.windowSize.height / 2 - initialModalState.height / 2,
                        zIndex: state.maxZIndex + 1,
                    },
                },
            }
        case 'unmount':
            const modalsClone = { ...state.modals }
            delete modalsClone[action.id]
            return {
                ...state,
                modals: modalsClone,
            }
        case 'windowResize':
            return {
                ...state,
                windowSize: action.size,
                modals: Object.keys(state.modals).reduce((modals, id) => {
                    const position = clampDrag(
                        state.windowSize.width,
                        state.windowSize.height,
                        state.modals[id].x,
                        state.modals[id].y,
                        state.modals[id].width,
                        state.modals[id].height,
                    )
                    const size = clampResize(
                        state.windowSize.width,
                        state.windowSize.height,
                        position.x,
                        position.y,
                        state.modals[id].width,
                        state.modals[id].height,
                    )
                    return {
                        ...modals,
                        [id]: {
                            ...state.modals[id],
                            ...position,
                            ...size,
                        },
                    }
                }, {}),
            }
        default:
            throw new Error()
    }
}
