import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client"
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Toaster />
      <div className='bg-gray-200 min-h-screen px-4'> 
        <Header />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
