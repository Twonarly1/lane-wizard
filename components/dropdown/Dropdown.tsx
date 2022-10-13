import { Combobox } from "@headlessui/react"
import { classNames } from "lib/utils"
import React, { SVGProps, useEffect } from "react"
import { useState, Fragment } from "react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"

type Props = {
    active: boolean
    getAthleteList: any
}

type Athlete = {
    firstName: string
    grade: number
    id: string
    lastName: string
    __typename: string
}

const Dropdown = ({ active, getAthleteList }: Props) => {
    const [selectedAthlete, setSelectedAthlete] = useState<any>("")
    const [query, setQuery] = useState("")

    // console.log(selectedAthlete)
    // console.log(getAthleteList)

    // Filter athletes
    const filteredAthletes =
        query === ""
            ? getAthleteList
            : getAthleteList?.filter((athlete: Athlete) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        console.log(
            "filtered",
            getAthleteList?.filter((athlete: Athlete) => {
                return athlete.firstName
            })
        )
    }, [])

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
            <div className="relative  w-full">
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
                                                    //@ts-ignore
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

export default Dropdown
