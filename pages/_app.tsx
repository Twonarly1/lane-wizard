import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client"
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Toaster />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
