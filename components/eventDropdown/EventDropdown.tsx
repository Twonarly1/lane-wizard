import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"
import { classNames } from "lib/utils"
import { useRouter } from "next/router"

type Props = {
    selectedEvent: string
    setSelectedEvent: any
}

const event: string[] = [
    "Team Medley",
    "Med. BA",
    "Med. BR",
    "Med. FL",
    "Med. FR",
    "200",
    "IM",
    "50",
    "Fly",
    "100",
    "500",
    "Team 200 FR",
    "200 FR",
    "Back",
    "Breast",
    "Team 400 FR",
    "400 FR",
    "100 IM",
    "diving 6",
    "diving 11",
]

const teamEvent: string[] = ["Team Medley", "Team 200 FR", "Team 400 FR"]

export default function EventDropdown({ selectedEvent, setSelectedEvent }: Props) {
    const [query, setQuery] = useState<string>("")
    const [teamEventsPage, setTeamEventsPage] = useState<boolean>(false)
    const router = useRouter()

    const filteredEvents =
        query === ""
            ? event
            : event.filter((event) => {
                  return event.toLowerCase().includes(query.toLowerCase())
              })

    const filteredTeamEvents =
        query === ""
            ? teamEvent
            : teamEvent.filter((event) => {
                  return event.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (router.pathname === "/createTeamEvent") {
            setTeamEventsPage(true)
        } else {
            setTeamEventsPage(false)
        }
    }, [])

    return (
        <Combobox
            as="div"
            className=" mx-1 mt-10 mb-2 cursor-default items-center"
            value={selectedEvent}
            onChange={setSelectedEvent}
        >
            <div className="relative w-full">
                <Combobox.Input
                    placeholder="select event"
                    className="comboboxInput cursor-text"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(event: string) => event}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronDownIcon className=" h-5 w-5" aria-hidden="true" />
                </Combobox.Button>

                {!teamEventsPage && filteredEvents.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredEvents.map((event: string, i: number) => (
                            <Combobox.Option
                                key={i}
                                value={event}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-pointer select-none py-2",
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
                {teamEventsPage && filteredTeamEvents.length > 0 && (
                    <Combobox.Options className="comboboxOptions">
                        {filteredTeamEvents.map((event: string, i: number) => (
                            <Combobox.Option
                                key={i}
                                value={event}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-pointer select-none py-2",
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
