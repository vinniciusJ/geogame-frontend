import React from 'react'
import theme from '../src/theme'
import PropTypes from 'prop-types'
import createEmotionCache from '../src/utils/createEmotionCache'

import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps{
	emotionCache?: EmotionCache
}
function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: Props) {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RecoilRoot>
					<Suspense fallback={<p>Loading...</p>}>
						<Component {...pageProps} />
					</Suspense>
				</RecoilRoot>		
			</ThemeProvider>
		</CacheProvider>
  	)	
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp