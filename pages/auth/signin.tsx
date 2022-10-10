import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import type { GetServerSideProps } from "next"
import type { Provider } from "next-auth/providers"

interface Props {
    providers: Provider[]
}

const SignIn = ({ providers }: Props) => {
    return (
        <div className="flex flex-col text-center">
            <p className="text-red-800">
                **REMINDER** You must have administrative privileges to create events, not any email
                will grant admin privileges.
            </p>
            <p>Reach out to samandrewengel@gmail.com OR hawkinson.beau@yahoo.com for inquiries.</p>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="transform cursor-pointer p-3 font-semibold text-indigo-500 transition duration-200 ease-out hover:scale-110"
                        onClick={() =>
                            signIntoProvider(provider.id, { callbackUrl: "/createEvent" })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}

export default SignIn
