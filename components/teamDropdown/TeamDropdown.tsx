import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import React, { useEffect, useState } from "react"

type Props = {
    selectedTeam: any
    setSelectedTeam: any
    getTeamList: any
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const TeamDropdown = ({ selectedTeam, setSelectedTeam, getTeamList }: Props) => {
    const [query, setQuery] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)

    // Filter athletes
    const filteredTeams =
        query === ""
            ? getTeamList
            : getTeamList?.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (!selectedTeam) {
            return
        } else {
            setActive(true)
        }
    }, [selectedTeam])

    return (
        <Combobox
            as="div"
            className="cursor mx-auto items-center"
            value={selectedTeam}
            onChange={setSelectedTeam}
        >
            <Combobox.Label className={`${active ? "visible" : "invisible"}`}>Team:</Combobox.Label>
            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select team"
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={selectedTeam}
                />
                <Combobox.Button className="comboboxButton cursor-default">
                    <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
                </Combobox.Button>

                {filteredTeams?.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredTeams.map((team: any, i: number) => (
                            <Combobox.Option
                                key={i}
                                value={team}
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
                                                {team}
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
        </Combobox>
    )
}

export default TeamDropdown
