import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import Container from '../src/components/Container'
import theme from '../src/theme'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RecoilRoot>
				<Container>
					<Component {...pageProps} />
				</Container>
			</RecoilRoot>		
		</ThemeProvider>
  	)	
}

export default MyApp
