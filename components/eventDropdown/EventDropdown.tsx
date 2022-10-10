import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import { Combobox } from "@headlessui/react"
import { useState } from "react"
import eventList from "eventList.json"

type Props = {
    selectedEvent: any
    setSelectedEvent: any
}

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(" ")
}

export default function EventDropdown({ selectedEvent, setSelectedEvent }: Props) {
    const [query, setQuery] = useState("")

    const filteredEvents: any =
        query === ""
            ? eventList
            : eventList.filter((event) => {
                  return event.name.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox
            as="div"
            className="mx-auto mt-2 items-center"
            value={selectedEvent}
            onChange={setSelectedEvent}
        >
            <Combobox.Label>Event:</Combobox.Label>
            <div className="relative w-full">
                <Combobox.Input
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(event: any) => event?.name}
                />
                <Combobox.Button className="comboboxButton cursor-default">
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Combobox.Button>

                {filteredEvents.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredEvents.map((person: any, i: number) => (
                            <Combobox.Option
                                key={i}
                                value={person}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-default select-none py-2",
                                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                "ml-3 truncate",
                                                selected && "font-semibold"
                                            )}
                                        >
                                            {person.name}
                                        </span>

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
