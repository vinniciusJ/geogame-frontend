import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Portal, Modal as ModalContainer, Box } from '@mui/material'

interface ModalMethods{
    openModal: () => void
    closeModal: () => void
}

interface Props{
    children: React.ReactNode
}

const Modal: React.ForwardRefRenderFunction<ModalMethods, Props> = ({ children }, ref) => {
    const [ isOpened, setIsOpened ] = useState(false)

    const openModal = useCallback(() => setIsOpened(true), [])
    const closeModal = useCallback(() => setIsOpened(false), [])

    useImperativeHandle(ref, () => ({ openModal, closeModal }))

    if(!isOpened){
        return null
    }

    return (
        <Portal container={document.body}>
            <ModalContainer
                open={isOpened}
                onClose={closeModal}
            >
                <Box
                    sx={{
                        w: '100%', 
                        h: '100%',
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundFixed: 'fixed',
                        backgroundImage: "url('/reverse-bg.svg')",
                        backgroundPosition: '0% 0%'
                    }}
                >
                    { children }
                </Box>
            </ModalContainer>
        </Portal>
    )
}

export default forwardRef(Modal)