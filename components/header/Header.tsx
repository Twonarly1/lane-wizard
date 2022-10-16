import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useLazyQuery } from "@apollo/client"
import { GET_ADMIN_BY_EMAIL } from "graphql/queries"
import { useSession, signOut, signIn } from "next-auth/react"
import { Bars3Icon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"

type Tab = {
    name: string
    path: string
    disabled: boolean
}
let navTabs: Tab[] = [
    { name: "team", path: "/", disabled: false },
    { name: "event", path: "/event", disabled: false },
    { name: "athlete", path: "/athlete", disabled: false },
    { name: "medley", path: "/medley", disabled: false },
    { name: "feedback", path: "/feedback", disabled: false },
    { name: "create Event", path: "/createEvent", disabled: true },
]

const Header = () => {
    const [open, setOpen] = useState(false)
    const { data: session }: any = useSession()
    const [adminPrivileges, setAdminPrivileges] = useState<boolean>(false)
    const [checkIfAdmin, { loading, error, data: getAdminByEmail }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>("")

    async function handlePrivileges(email: string) {
        const check = await checkIfAdmin({
            variables: {
                email: email,
            },
        })
        if (check) {
            setAdminPrivileges(true)
            navTabs[5].disabled = false
        } else {
            setAdminPrivileges(false)
            navTabs[5].disabled = true
        }
    }

    useEffect(() => {
        if (!session) return
        handlePrivileges(session.user.email)
    }, [session])

    useEffect(() => {
        if (router.pathname == "/") {
            setActiveTab("team")
        } else {
            setActiveTab(router.pathname.substring(1))
        }
    }, [router.pathname])

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className=" mx-auto flex h-[55px] max-w-lg items-center justify-between">
            <div>
                {navTabs.slice(0, 4).map((tab: Tab, index: number) => (
                    <Link href={tab.path} key={index} className="">
                        <a
                            className={`cursor-pointer rounded-md px-3 py-2 text-lg font-medium outline-none  ${
                                tab.name == activeTab
                                    ? "text-blue-500  "
                                    : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            {capitalizeFirstLetter(tab.name)}
                        </a>
                    </Link>
                ))}
            </div>
            <div className="links cursor-pointer">
                <Bars3Icon
                    onClick={() => setOpen(true)}
                    className="h-8 w-8 rounded border bg-gray-200 p-1 font-medium text-gray-500 hover:bg-gray-50"
                />
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                    <Dialog.Panel className="pointer-events-auto w-screen md:w-[377px]">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex h-[55px] items-center justify-between bg-blue-200">
                                                <Dialog.Title className="ml-3 text-3xl font-semibold text-gray-600">
                                                    Meets
                                                </Dialog.Title>
                                                <div className="mr-3 flex items-center">
                                                    <button
                                                        type="button"
                                                        className=" rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon
                                                            className=" h-8 w-8"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className=" flex flex-col divide-y text-left">
                                                {navTabs.map((tab: Tab, index: number) => {
                                                    if (!tab.disabled)
                                                        return (
                                                            <Link
                                                                href={tab.path}
                                                                key={index}
                                                                className=""
                                                            >
                                                                <a
                                                                    onClick={() => setOpen(false)}
                                                                    className={`cursor-pointer px-3 py-2 text-lg font-medium outline-none  ${
                                                                        tab.name.replace(" ", "") ==
                                                                        activeTab
                                                                            ? "text-blue-500  "
                                                                            : "text-gray-500 hover:bg-gray-50"
                                                                    }`}
                                                                >
                                                                    {capitalizeFirstLetter(
                                                                        tab.name
                                                                    )}
                                                                </a>
                                                            </Link>
                                                        )
                                                })}
                                                {session ? (
                                                    <button
                                                        onClick={() => {
                                                            signOut()
                                                            setOpen(false)
                                                        }}
                                                        className="cursor-pointer px-3 py-2 text-lg font-medium text-gray-500 outline-none hover:bg-gray-50"
                                                    >
                                                        <p className="text-left">Logout</p>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            signIn()
                                                            setOpen(false)
                                                        }}
                                                        className="cursor-pointer px-3 py-2 text-lg font-medium text-gray-500 outline-none hover:bg-gray-50"
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
        </div>
    )
}

export default Header
