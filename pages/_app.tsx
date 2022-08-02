import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import Container from '../src/components/Container'
import theme from '../src/theme'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container>
				<Component {...pageProps} />
			</Container>
		</ThemeProvider>
  	)	
}

export default MyApp
