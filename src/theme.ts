import { createTheme, Theme } from '@mui/material/styles'
import React from 'react'

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		geogame: {
			'black-100': React.CSSProperties['color'],
			'gray-100': React.CSSProperties['color']
			'orange-500': React.CSSProperties['color'],
			'orange-800': React.CSSProperties['color'],
			'green-100': React.CSSProperties['color'],
			'green-200': React.CSSProperties['color'],
			'green-300': React.CSSProperties['color'],
			'green-500': React.CSSProperties['color'],
			'green-700': React.CSSProperties['color'],
		}
	}
	interface PaletteOptions {
		geogame: {
			'black-100': React.CSSProperties['color'],
			'gray-100': React.CSSProperties['color'],
			'orange-500': React.CSSProperties['color'],
			'orange-800': React.CSSProperties['color'],
			'green-100': React.CSSProperties['color'],
			'green-200': React.CSSProperties['color'],
			'green-300': React.CSSProperties['color'],
			'green-500': React.CSSProperties['color'],
			'green-700': React.CSSProperties['color'],
		}
	}
}


const theme = createTheme({
	palette: {
		geogame: {
			'black-100': '#252525',
			'gray-100': '#A8C6C0',
			'green-100': '#ECFFFC',
			"green-200": '#B9EBE2',
			"green-300": '#82D0C2',
			'green-500': '#36CC73',
			'green-700': '#54A99A',
			"orange-500": '#FF7544',
			"orange-800": '#E14D1E'
		}
	},
	typography: {
		fontFamily: "'Dosis', sans-serif",
		allVariants: {
			color: '#252525',
			lineHeight: 1.3,
			fontSize: '1rem',
			textDecoration: 'none',
		},
		h1: {
			fontWeight: 700,
			fontSize: '3.5rem'
		},
		button: {
			fontWeight: 600,
			color: '#FFF',
			fontSize: '1.5rem',
			textDecoration: 'none',
		},
		caption: {
			fontWeight: 600,
			fontSize: '1.5rem',
			textDecoration: 'none',
		},
		h2: {
			fontWeight: 600,
			fontSize: '2rem'
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					width: '100%',
					color: '#FFF',
					background: '#FF7544',
					borderRadius: '8px',
					textTransform: 'none',
					'&:hover': {
						background: '#F18E6B'
					}
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& fieldset': {
						border: 'solid 1px #252525'
					},
					'& .Mui-focused fieldset': {
						border: 'solid 1px #82D0C2 !important',	
					},
					'& .Mui-error fieldset': {
						border: 'solid 1px #E14D1E !important',	
					},
					'& .MuiFormHelperText-root': {
						color: '#E14D1E',
						marginLeft: 0,
						fontSize: '1rem !important'
					}
				}
			}
		}
	}
})

export default theme