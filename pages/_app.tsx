import "styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import client from "apollo-client"
import { Toaster } from "react-hot-toast"
import { Header } from "components"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        //@ts-ignore
        <SessionProvider session={pageProps.session}>
            <ApolloProvider client={client}>
                <Toaster />
                <div className="min-h-screen bg-gray-200 px-4">
                    <Header />
                    <Component {...pageProps} />
                </div>
            </ApolloProvider>
        </SessionProvider>
    )
}

export default MyApp
