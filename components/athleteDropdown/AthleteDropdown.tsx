import { useLazyQuery } from "@apollo/client"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid"
import { GET_ADMIN_BY_EMAIL } from "graphql/queries"
import { classNames } from "lib/utils"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

type Props = {
    selectedAthlete: string
    setSelectedAthlete: any
    getAthleteList: any
}

const AthleteDropdown = ({ selectedAthlete, setSelectedAthlete, getAthleteList }: Props) => {
    const router = useRouter()
    const [query, setQuery] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const { data: session }: any = useSession()
    const [getAdminByEmail, { error: adminError, loading: admingLoading, data: adminApproved }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)
    const [admin, setAdmin] = useState<boolean>(false)

    useEffect(() => {
        if (!session) return
        getAdminByEmail({
            variables: {
                email: session.user.email,
            },
        })
    }, [session])

    const filteredAthletes =
        query === ""
            ? getAthleteList
            : getAthleteList?.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (!selectedAthlete) return
        setActive(true)
    }, [selectedAthlete])

    const handleInputClick = () => {
        if (!checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    useEffect(() => {
        if (router.pathname == "/createEvent") setAdmin(true)
    }, [router.pathname])

    return (
        <Combobox
            as="div"
            className="mx-auto mt-10 mb-2 cursor-pointer items-center"
            value={selectedAthlete}
            onChange={setSelectedAthlete}
        >
            {/* <Combobox.Label className={`flex items-center ${active ? "visible" : "invisible"}`}>
                Athlete:
            </Combobox.Label> */}

            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select athlete"
                    className="comboboxInput cursor-text"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={checked ? (event: string) => event : () => ""}
                />
                <Combobox.Button className="comboboxButton cursor-pointer">
                    <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
                </Combobox.Button>

                {filteredAthletes?.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredAthletes.map((athlete: any) => (
                            <Combobox.Option
                                key={athlete.id}
                                value={athlete.firstName + " " + athlete.lastName}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-pointer select-none py-2",
                                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <span
                                                className={classNames(
                                                    "ml-3 truncate",
                                                    selected && "font-semibold"
                                                )}
                                            >
                                                {athlete.firstName + " " + athlete.lastName}
                                            </span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                    active ? "text-white" : "text-indigo-500"
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>

            {checked ? (
                <button
                    onClick={() => {
                        setChecked(false)
                    }}
                    className={` relative mx-auto mt-2 flex cursor-pointer  justify-end text-right text-gray-500 outline-none  ${
                        admin ? "visible" : "invisible"
                    } `}
                >
                    <div className="flex items-center space-x-2">
                        <LockOpenIcon
                            onClick={() => {
                                setChecked(false)
                            }}
                            className="h-4 w-4"
                        />
                        <p className="text-xs">lock athlete</p>
                    </div>
                </button>
            ) : (
                <button
                    onClick={() => {
                        setChecked(true)
                    }}
                    className={`relative mx-auto mt-2 flex cursor-pointer justify-end text-right text-gray-500 outline-none ${
                        admin ? "visible" : "invisible"
                    } `}
                >
                    <div className="flex items-center space-x-2">
                        <LockClosedIcon
                            onClick={() => {
                                setChecked(false)
                            }}
                            className="h-4 w-4"
                        />
                        <p className="text-xs">unlock athlete</p>
                    </div>
                </button>
            )}
        </Combobox>
    )
}

export default AthleteDropdown
