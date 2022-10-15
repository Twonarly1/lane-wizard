import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import type { GetServerSideProps } from "next"
import type { Provider } from "next-auth/providers"

interface Props {
    providers: Provider[]
}

const SignIn = ({ providers }: Props) => {
    return (
        <div className="relative min-h-screen">
            <div className="relative flex flex-col text-center">
                <div className="mx-auto max-w-md p-10 md:justify-between">
                    <div className="max-w-xl items-center text-left">
                        <h2 className="text-5xl font-bold tracking-tight">Why sign in?</h2>
                        <p className="mt-5 text-lg text-purple-500">
                            You are an administered user and want to create events.
                        </p>
                        <p className="mt-5 text-lg text-blue-500">You want to add feedback!</p>
                    </div>
                    {Object.values(providers).map((provider) => (
                        <>
                            <div
                                key={provider.name}
                                className="relative mx-auto mt-[89px] flex w-full items-center"
                            >
                                <button
                                    className="absolute bottom-0 right-0 h-[55px]  transform cursor-pointer border border-green-500 bg-white px-6 font-semibold uppercase tracking-widest text-green-500 transition duration-200 ease-out hover:bg-green-500 hover:text-white"
                                    onClick={() =>
                                        signIntoProvider(provider.id, {
                                            callbackUrl: "/createEvent",
                                        })
                                    }
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                            <button
                                onClick={(e) => {
                                    window.location.href = "mailto:hawkinson.beau@yahoo.com"
                                    e.preventDefault()
                                }}
                                className=" w-full transform cursor-pointer border text-right text-[10px] uppercase tracking-wider text-gray-500 hover:text-black"
                            >
                                email creator
                            </button>
                        </>
                    ))}
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
