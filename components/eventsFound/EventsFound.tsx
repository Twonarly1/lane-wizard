import { useLazyQuery } from "@apollo/client"
import { Dialog, Switch } from "@headlessui/react"
import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { GET_EVENTS_BY_EVENT } from "graphql/queries"
import { classNames } from "lib/utils"
import React, { useEffect, useState } from "react"

type Props = {
    selectedEvent: any
}

const EventsFound = ({ selectedEvent }: Props) => {
    const [getEventsByEvent, { loading: eventsLoading, error: eventsError, data: getEvents }] =
        useLazyQuery(GET_EVENTS_BY_EVENT)
    const [simulate400FR, setSimulate400FR] = useState<boolean>(false)
    const [enabled, setEnabled] = useState(false)
    const [simulatedRelayTime, setSimulatedRelayTime] = useState<string | null>(null)
    const [checked, setChecked] = useState<any>([])
    let [isOpen, setIsOpen] = useState(false)

    console.log(getEvents)

    useEffect(() => {
        if (!selectedEvent) {
            return
        } else {
            getEventsByEvent({
                variables: {
                    event: selectedEvent.name,
                },
            })
            checkIfSimulationIsAvailable()
        }
    }, [selectedEvent])

    const numbers = getEvents?.getEventsByEvent.map((o: any) => {
        return o
    })

    numbers?.sort(compareFunction)

    function compareFunction(a: any, b: any) {
        return a.milliseconds - b.milliseconds
    }

    const checkIfSimulationIsAvailable = () => {
        if (selectedEvent.name.includes("relay")) {
            return setSimulate400FR(true)
        } else {
            return setSimulate400FR(false)
        }
    }

    const handleCheck = (e: { target: { checked: any; value: string } }, params: any) => {
        const event_id = e.target.value
        const event_milliseconds = params.event.milliseconds
        var updatedList = [...checked]
        const present = updatedList.find((event: any) => {
            return event.event_id == event_id
        })
        if (present) {
            console.log(present, `id found --> remove event.id ${event_id}`)
            updatedList.splice(updatedList.indexOf(event_id), 1)
        } else {
            console.log(present, `id not found --> add event.id ${event_id}`)
            if (checked.length !== 4) {
                updatedList = [...checked, { event_id, event_milliseconds }]
            } else {
                e.target.checked = false
            }
        }
        setChecked(updatedList)
    }

    const calculate400FRSimulationTime = () => {
        setSimulatedRelayTime(null)
        const numbers = checked?.map((n: any) => {
            return n.event_milliseconds
        })
        const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const min: number = Math.floor(sum / 1000 / 60)
        const sec: any = ((sum / 1000) % 60).toFixed(2)
        const swimTime = "0" + min + ":" + sec
        setSimulatedRelayTime(swimTime)
    }

    useEffect(() => {
        if (!enabled) {
            setChecked([])
            setSimulatedRelayTime(null)
        }
    }, [enabled])

    if (eventsLoading) return <p className="loading">Loading ...</p>
    if (eventsError) return <pre>{JSON.stringify(eventsError, null, 2)}</pre>

    return (
        selectedEvent && (
            <div className="mt-10">
                {simulate400FR && (
                    <div className="mx-auto w-full justify-center">
                        <div className="mx-auto flex items-center justify-center space-x-2">
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={classNames(
                                    enabled ? "bg-white" : "bg-white",
                                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent  duration-200 ease-in-out focus:outline-none"
                                )}
                            >
                                <span className="sr-only">relay simulation</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabled
                                            ? "translate-x-5 bg-red-200"
                                            : "translate-x-0 bg-green-200",
                                        "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out focus:outline-none"
                                    )}
                                />
                            </Switch>
                            <p className="ml-12">
                                {!enabled ? "relay simulation" : "close simulation"}
                            </p>
                            <QuestionMarkCircleIcon
                                onClick={() => setIsOpen(true)}
                                className="h-5 w-5 cursor-pointer rounded-full text-gray-500/60"
                            />

                            <Dialog
                                open={isOpen}
                                onClose={() => setIsOpen(false)}
                                className="relative z-50 "
                            >
                                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                                <div
                                    className="fixed inset-0 w-full bg-black/60"
                                    aria-hidden="true"
                                />

                                {/* Full-screen container to center the panel */}
                                <div className="  fixed inset-0 mt-[12%] flex h-fit  justify-center">
                                    <Dialog.Panel className="relative w-full max-w-lg rounded-2xl bg-white">
                                        <Dialog.Title className=" h-12 text-center text-lg">
                                            <p className="pt-3">How to simulate?</p>
                                        </Dialog.Title>

                                        {/* here */}
                                        <video controls className="rounded-b-2xl">
                                            <source
                                                src="./demoSimulation.mp4"
                                                className="rounded-xl"
                                                type="video/mp4"
                                            />
                                        </video>

                                        <button
                                            className="absolute top-2 right-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <XCircleIcon className="h-8 w-8 rounded-full text-gray-500" />
                                        </button>
                                    </Dialog.Panel>
                                </div>
                            </Dialog>
                        </div>
                        <div className="mt-5 flex w-full justify-between">
                            {enabled && (
                                <>
                                    <div className="flex space-x-2">
                                        <button
                                            disabled={checked.length != 4}
                                            className={`bg-white px-4 py-1 ${
                                                checked.length != 4 && "cursor-not-allowed"
                                            }`}
                                            onClick={calculate400FRSimulationTime}
                                        >
                                            get time
                                        </button>
                                    </div>
                                    <p className="bg-white px-4 py-1">
                                        {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-2 flex flex-col justify-between overflow-x-auto">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                {enabled && <th scope="col" className="col pl-2"></th>}
                                <th scope="col" className="col">
                                    Rank
                                </th>
                                <th scope="col" className="col">
                                    Name
                                </th>
                                <th scope="col" className="col">
                                    Grade
                                </th>
                                <th scope="col" className="col">
                                    Team
                                </th>
                                <th scope="col" className="col text-right">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {numbers?.map((event: any, idx: number) => (
                                <tr key={idx} className="tr">
                                    {enabled && (
                                        <td className="row w-4 pl-2 pr-0">
                                            <input
                                                className="radio"
                                                type="checkbox"
                                                value={event.id}
                                                onChange={(e: any) => handleCheck(e, { event })}
                                            />
                                        </td>
                                    )}
                                    <td className="row">{idx + 1}</td>
                                    <td className="row">{event.fullName}</td>
                                    <td className="row">{event.grade}</td>
                                    <td className="row">{event.team}</td>
                                    <td className="row">{event.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )
}

export default EventsFound
