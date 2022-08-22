import { atom } from 'recoil'
import { IGame } from '../interfaces/IGame'
import generateCoordinate from '../utils/generateCoordinate'

export const user = atom<string>({
	key: 'user',
	default: ''
})

export const game = atom<IGame[]>({
	key: 'game',
	default: Array.from({ length: 10 }).map((_, index) => ({ 
		round: index,
		status: null
	}))
})

export const currentCoordinate = atom<string>({
	key: 'currentCoordinate',
	default: '-- : --'
})

export const sortedCoordinates = atom<string[]>({
	key: 'sortedCoordinates',
	default: Array.from({ length: 10 }).map(() => generateCoordinate())
})

export const currentRound = atom<number>({
	key: 'currentRound',
	default: 0
})

export const time = atom<number>({
	key: 'time',
	default: 0
})

export const timer = atom<NodeJS.Timer | null>({
	key: 'timer',
	default: null
})