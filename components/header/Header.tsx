import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useLazyQuery } from "@apollo/client"
import { GET_ADMIN_BY_EMAIL } from "graphql/queries"

const Header = () => {
    const { data: session }: any = useSession()
    const [adminPrivileges, setAdminPrivileges] = useState<boolean>(false)
    const [checkIfAdmin, { loading, error, data: getAdminByEmail }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)

    async function handlePrivileges(email: string) {
        const check = await checkIfAdmin({
            variables: {
                email: email,
            },
        })
        if (check) {
            setAdminPrivileges(true)
        } else {
            setAdminPrivileges(false)
        }
    }

    useEffect(() => {
        if (!session) return
        handlePrivileges(session.user.email)
    }, [session])

    // if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <header className=" mx-auto flex w-full items-center justify-center bg-gray-200 pt-4 pb-12">
            <Link href="/" className="">
                <a className="links rounded-l bg-gray-100">Team</a>
            </Link>
            <Link href="/event" className="">
                <a className="links bg-gray-100">Event</a>
            </Link>
            <Link href="/athlete" className="">
                <a className="links rounded-r bg-gray-100">Athlete</a>
            </Link>
            <Link href="/medley" className="">
                <a className="links rounded-r bg-gray-100">Medley</a>
            </Link>
            {session && (
                <Link href="/createEvent" className="items-center">
                    <button
                        className={`links ${!adminPrivileges && "cursor-not-allowed"}`}
                        disabled={!adminPrivileges}
                    >
                        Create
                    </button>
                </Link>
            )}
            {session ? (
                <button onClick={() => signOut()} className="links">
                    Logout
                </button>
            ) : (
                <button onClick={() => signIn()} className="links">
                    Login
                </button>
            )}
        </header>
    )
}

export default Header
