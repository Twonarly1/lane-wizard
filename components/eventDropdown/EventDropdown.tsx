import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"
import { classNames } from "lib/utils"

type Props = {
    selectedEvent: string
    setSelectedEvent: any
}

const event: string[] = [
    "Med. BA",
    "Med. BR",
    "Med. FL",
    "Med. FR",
    "200 free",
    "IM",
    "50 free",
    "100 fly",
    "100 free",
    "500 free",
    "200 free relay",
    "100 backstroke",
    "100 breastroke",
    "400 free relay",
    "100 individual medley",
    "diving 6",
    "diving 11",
]

export default function EventDropdown({ selectedEvent, setSelectedEvent }: Props) {
    const [query, setQuery] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)

    console.log(selectedEvent)

    const filteredEvents =
        query === ""
            ? event
            : event.filter((event) => {
                  return event.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (!selectedEvent) return
        setActive(true)
    }, [selectedEvent])

    return (
        <Combobox
            as="div"
            className="mx-auto items-center"
            value={selectedEvent}
            onChange={setSelectedEvent}
        >
            <Combobox.Label className={`${active ? "visible" : "invisible"}`}>
                Event:
            </Combobox.Label>
            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select event"
                    className="comboboxInput cursor-default"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(event: string) => event}
                />
                <Combobox.Button className="comboboxButton cursor-default">
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Combobox.Button>

                {filteredEvents.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredEvents.map((event: string, i: number) => (
                            <Combobox.Option
                                key={i}
                                value={event}
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
                                            {event}
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
