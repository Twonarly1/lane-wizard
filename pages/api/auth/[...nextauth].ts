import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../lib/env"

export const authOptions = {
    // Configure one or more authentication providers
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
}
export default NextAuth(authOptions)
