import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import React, { useEffect, useState } from "react"

type Props = {
    selectedAthlete: any
    setSelectedAthlete: any
    getAthleteList: any
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const AthleteDropdown = ({ selectedAthlete, setSelectedAthlete, getAthleteList }: Props) => {
    const [query, setQuery] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)

    // Filter athletes
    const filteredAthletes =
        query === ""
            ? getAthleteList
            : getAthleteList?.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (!selectedAthlete) {
            return
        } else {
            setActive(true)
        }
    }, [selectedAthlete])

    // console.log(getAthleteList)
    // console.log(filteredAthletes)

    return (
        <Combobox
            as="div"
            className="cursor mx-auto mb-2 items-center"
            value={selectedAthlete}
            onChange={setSelectedAthlete}
        >
            <Combobox.Label className={`${active ? "visible" : "invisible"}`}>
                Athlete:
            </Combobox.Label>
            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select athlete"
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={selectedAthlete}
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
