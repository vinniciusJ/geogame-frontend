import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { Portal, Modal as ModalContainer, Box, Dialog, DialogContent, Stack, IconButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
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
            <Dialog
                open={isOpened}
                onClose={closeModal}
            >
                <DialogContent
                    sx={ theme => ({
                        position: 'relative',
                        minWidth: `${theme.spacing(54)} !important`,
                        minHeight: `${theme.spacing(33)} !important`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundFixed: 'fixed',
                        backgroundImage: "url('/reverse-bg.svg')",
                        backgroundPosition: '0% 0%',
                        backgroundColor: theme.palette.geogame['green-100']
                    })}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <IconButton onClick={closeModal}>
                            <CloseIcon sx={{ fill: '#252525' }}/>
                        </IconButton>
                    </Box>

                    { children }
                </DialogContent>
            </Dialog>
        </Portal>
    )
}

export const useModal = () => useRef<ModalMethods>(null)

export default forwardRef(Modal)