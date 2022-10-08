import Link from "next/link"
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

const Header = (props: Props) => {
    const { data: session } = useSession()
    return (
        <header className="mx-auto flex w-fit justify-center bg-gray-200 pt-4 pb-4">
            <Link href="/" className="">
                <a className="links">Create Event</a>
            </Link>
            <Link href="/event" className="">
                <a className="links">Event Ranking</a>
            </Link>
            <Link href="/all" className="">
                <a className="links">All Times</a>
            </Link>
            {session ? (
                <button
                    onClick={() => signOut()}
                    className="rounded-md bg-blue-400 px-2 text-sm text-white"
                >
                    Sign Out
                </button>
            ) : (
                <button
                    onClick={() => signIn()}
                    className="rounded-md bg-blue-400 px-2 text-sm text-white"
                >
                    Sign In
                </button>
            )}
        </header>
    )
}

export default Header
