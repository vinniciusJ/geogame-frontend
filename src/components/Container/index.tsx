import React from 'react'

import { Box } from '@mui/material'

interface Props{
    children: React.ReactNode
}

const Container: React.FC <Props> = ({ children }) => {
    return (
        <Box
           sx={theme => ({
                background: theme.palette.geogame['green-100'],
                minHeight: '100vh',
                width: '100vw',
                backgroundRepeat: 'no-repeat',
                backgroundFixed: 'fixed',
                backgroundImage: "url('/background.svg')",
                backgroundPosition: '100% 100%'
            })}
            component='main'
        >
            { children }
        </Box>
    )
}

export default Container