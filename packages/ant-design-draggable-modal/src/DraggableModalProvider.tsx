import * as React from 'react'
import { useCallback, useReducer } from 'react'
import { DraggableModalContext } from './DraggableModalContext'

const register = 'register'
const onRegister = (id: string) => ({
    type: register,
    id,
})

const unregister = 'unregister'
const onUnregister = (id: string) => ({
    type: unregister,
    id,
})

const focus = 'focus'
const onFocus = (id: string) => ({
    type: focus,
    id,
})

type State = {
    maxZIndex: number
    modals: {
        [key: string]: number
    }
}

const initialState: State = {
    maxZIndex: 0,
    modals: {},
}

const reducer = (state: State, { type, id }: { type: string; id: string }) => {
    switch (type) {
        case unregister:
            const clone = { ...state }
            delete clone.modals[id]
            return clone
        case register:
        case focus:
            return {
                maxZIndex: state.maxZIndex + 1,
                modals: {
                    ...state.modals,
                    [id]: state.maxZIndex,
                },
            }
        default:
            throw new Error()
    }
}

export const DraggableModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const registerModal = useCallback(id => dispatch(onRegister(id)), [])
    const unregisterModal = useCallback(id => dispatch(onUnregister(id)), [])
    const focus = useCallback(id => dispatch(onFocus(id)), [])
    const value = {
        state,
        registerModal,
        unregisterModal,
        focus,
    }
    return <DraggableModalContext.Provider value={value}>{children}</DraggableModalContext.Provider>
}
