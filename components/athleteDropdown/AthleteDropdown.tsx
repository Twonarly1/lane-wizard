import { useLazyQuery } from "@apollo/client"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import { GET_ADMIN_BY_EMAIL } from "graphql/queries"
import { classNames } from "lib/utils"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

type Props = {
    selectedAthlete: string
    setSelectedAthlete: any
    getAthleteList: any
}

const AthleteDropdown = ({ selectedAthlete, setSelectedAthlete, getAthleteList }: Props) => {
    const [query, setQuery] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const { data: session }: any = useSession()
    const [getAdminByEmail, { error: adminError, loading: admingLoading, data: adminApproved }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)

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
        if (checked) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    return (
        <Combobox
            as="div"
            className="cursor mx-auto mt-10 mb-2 flex items-center space-x-2"
            value={selectedAthlete}
            onChange={setSelectedAthlete}
        >
            <Combobox.Label className={`flex items-center ${active ? "visible" : "invisible"}`}>
                Athlete:
            </Combobox.Label>

            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select athlete"
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={checked ? (event: string) => event : () => ""}
                />
                <Combobox.Button className="comboboxButton cursor-default">
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
                                        "relative cursor-default select-none py-2",
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
            <input
                type="checkbox"
                className={`radio h-5 w-5 ${adminApproved && active ? "visible" : "invisible"} `}
                onChange={handleInputClick}
            />
        </Combobox>
    )
}

export default AthleteDropdown
