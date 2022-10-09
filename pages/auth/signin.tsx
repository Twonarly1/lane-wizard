import { getProviders, signIn as signIntoProvider } from "next-auth/react"

import type { GetServerSideProps } from "next"
import type { Provider } from "next-auth/providers"
import { CloudIcon } from "@heroicons/react/20/solid"

interface Props {
    providers: Provider[]
}

const SignIn = ({ providers }: Props) => {
    return (
        <div className="-mt-20 flex min-h-screen flex-col items-center justify-center bg-gray-50 py-2 px-14 text-center">
            <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#40c9ff] via-[#0061ff] to-[#e81cff] blur-md"></div>
                <div className="relative rounded-lg border-4 border-black bg-white p-4">
                    <div className="flex-col items-center space-y-4">
                        <div className="relative flex items-center justify-center">
                            <CloudIcon className="h-14 w-14 text-blue-400" />
                        </div>

                        <div className="mt-40">
                            {Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <button
                                        className="transform cursor-pointer rounded-lg border-4 border-transparent p-3 font-semibold text-blue-400 transition duration-200 ease-out hover:scale-110"
                                        onClick={() =>
                                            signIntoProvider(provider.id, { callbackUrl: "/" })
                                        }
                                    >
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
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
