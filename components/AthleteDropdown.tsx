import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

type Props = {
    selectedPerson: any
    setSelectedPerson: any
    setQuery: any
    filteredAthletes: any
}


function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const AthleteDropdown = ({selectedPerson, setSelectedPerson, setQuery, filteredAthletes}: Props) => {
 
  return (
    <Combobox
        as="div"
        className="text-black w-full space-x-4 flex items-center"
        value={selectedPerson}
        onChange={setSelectedPerson}
    >
        <p className="text-black w-14 font-bold">
        Name:
        </p>
        <div className="relative w-full">
            <Combobox.Input
                className="w-full border-none rounded"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={selectedPerson}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                />
            </Combobox.Button>

            {filteredAthletes.length > 0 && (
                <Combobox.Options className="absolute mt-2 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {filteredAthletes.map((athlete: any) => (
                        <Combobox.Option
                            key={athlete.id}
                            value={athlete.firstName + " " + athlete.lastName}
                            className={({ active }) =>
                                classNames(
                                    "relative cursor-default select-none py-2",
                                    active
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-900"
                                )
                            }
                        >
                            {({ active, selected }) => (
                                <>
                                    <div className="flex items-center">
                                        <span
                                            className={classNames(
                                                "ml-3 truncate",
                                                selected && "font-semibold"
                                            )}
                                        >
                                            {athlete.firstName +
                                                " " +
                                                athlete.lastName}
                                        </span>
                                    </div>

                                    {selected && (
                                        <span
                                            className={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                    ? "text-white"
                                                    : "text-indigo-600"
                                            )}
                                        >
                                            <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    )}
                                </>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            )}
        </div>
    </Combobox>  )
}

export default AthleteDropdown