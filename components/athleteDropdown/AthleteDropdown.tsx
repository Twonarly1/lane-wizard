import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import React, { useState } from "react"

type Props = {
    selectedPerson: any
    setSelectedPerson: any
    getAthleteList: any
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const AthleteDropdown = ({ selectedPerson, setSelectedPerson, getAthleteList }: Props) => {
    const [query, setQuery] = useState<string>("")
    // Filter athletes
    const filteredAthletes =
        query === ""
            ? getAthleteList
            : getAthleteList?.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox
            as="div"
            className="cursor mx-auto items-center"
            value={selectedPerson}
            onChange={setSelectedPerson}
        >
            <Combobox.Label>Athlete:</Combobox.Label>
            <div className="relative w-full">
                <Combobox.Input
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={selectedPerson}
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
        </Combobox>
    )
}

export default AthleteDropdown
