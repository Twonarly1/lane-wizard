import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useLazyQuery } from "@apollo/client"
import { GET_ADMIN_BY_EMAIL } from "graphql/queries"
import { useSession, signOut, signIn } from "next-auth/react"
import Header from "./Header"
import { Bars3Icon } from "@heroicons/react/20/solid"

export default function Example() {
    const [open, setOpen] = useState(false)
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
    return (
        <>
            <Header />
            <div className="mx-auto flex w-full max-w-lg justify-end py-2 md:hidden">
                <button className="links pr-0" onClick={() => setOpen(true)}>
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className={`relative z-10 ${open ? "md:hidden" : "flex"}`}
                    onClose={setOpen}
                >
                    <div className="fixed inset-0" />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-[377px]">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="px-3 ">
                                                <div className="mt-2 flex items-start justify-between">
                                                    <Dialog.Title className=" text-lg font-medium text-gray-900">
                                                        Meets
                                                    </Dialog.Title>
                                                    <div className=" flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="mt-3 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">
                                                                Close panel
                                                            </span>
                                                            <XMarkIcon
                                                                className=" h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" flex flex-col text-left">
                                                <Link href="/" className="">
                                                    <a
                                                        onClick={() => setOpen(false)}
                                                        className="links rounded-l py-1"
                                                    >
                                                        Team
                                                    </a>
                                                </Link>
                                                <Link href="/event" className="">
                                                    <a
                                                        onClick={() => setOpen(false)}
                                                        className="links py-1"
                                                    >
                                                        Event
                                                    </a>
                                                </Link>
                                                <Link href="/athlete" className="">
                                                    <a
                                                        onClick={() => setOpen(false)}
                                                        className="links rounded-r bg-white py-1"
                                                    >
                                                        Athlete
                                                    </a>
                                                </Link>
                                                <Link href="/medley" className="">
                                                    <a
                                                        onClick={() => setOpen(false)}
                                                        className="links rounded-r bg-white py-1"
                                                    >
                                                        Medley
                                                    </a>
                                                </Link>
                                                <Link href="/feedback" className="">
                                                    <a
                                                        onClick={() => setOpen(false)}
                                                        className="links rounded-r bg-white py-1"
                                                    >
                                                        Feedback
                                                    </a>
                                                </Link>
                                                {session && (
                                                    <Link href="/createEvent" className="">
                                                        <button
                                                            onClick={() => setOpen(false)}
                                                            className={`links py-1 ${
                                                                !adminPrivileges &&
                                                                "cursor-not-allowed"
                                                            }`}
                                                            disabled={!adminPrivileges}
                                                        >
                                                            <p className="text-left">Create</p>
                                                        </button>
                                                    </Link>
                                                )}
                                                {session ? (
                                                    <button
                                                        onClick={() => {
                                                            signOut()
                                                            setOpen(false)
                                                        }}
                                                        className="links py-1"
                                                    >
                                                        <p className="text-left">Logout</p>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            signIn()
                                                            setOpen(false)
                                                        }}
                                                        className="links py-1"
                                                    >
                                                        <p className="text-left">Login</p>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
