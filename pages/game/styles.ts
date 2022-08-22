import { styled } from '@mui/material'

import Stack, { StackProps } from '@mui/material/Stack'
import Box, { BoxProps } from '@mui/material/Box'

interface StatusBoxProps extends BoxProps{
	status: 'right' | 'wrong' | null
}

export const GameSidebar = styled(Stack)<StackProps>(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	justifyContent: 'space-between',
	background: theme.palette.geogame['green-200'],
	width: theme.spacing(30),
	padding: theme.spacing(4)
}))

export const CoordinatesBox = styled(Stack)<StackProps>(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	background: theme.palette.geogame['orange-500'],
	width: '100%',
	marginTop: theme.spacing(2),
	color: '#FFF',
	padding: `${theme.spacing(1.5)} ${theme.spacing(6)}`,
	fontWeight: 700,
	borderRadius: theme.spacing(.5)
}))

export const TimeBox = styled(Stack)<StackProps>(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: theme.spacing(2),
	background: theme.palette.geogame['green-700'],
	color: '#FFF',
	width: '100%',
	padding: `${theme.spacing(1.5)} 0`,
	borderRadius: theme.spacing(.5)
}))

export const StatusBox = styled(Box)<StatusBoxProps>(({ theme, status }) => ({
	width: theme.spacing(3),
	height: theme.spacing(3),
	background: theme.palette.geogame[(status == 'right' ? 'green-500' : (status ? 'orange-800' : 'gray-100'))],
	borderRadius: '50%'
}))

export const GameContainer = styled(Stack)<StackProps>(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: `calc(50% + ${theme.spacing(15)})`,
	transform: `translate(-50%, -50%)`
}))

export const WindRose = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'absolute',
	right: theme.spacing(3),
	bottom: theme.spacing(3)
}))