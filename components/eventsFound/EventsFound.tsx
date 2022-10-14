import { useLazyQuery } from "@apollo/client"
import { Switch } from "@headlessui/react"
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid"
import { GET_EVENTS_BY_EVENT } from "graphql/queries"
import { classNames } from "lib/utils"
import React, { useEffect, useState } from "react"
import DialogDemo from "./DialogDemo"

type Props = {
    selectedEvent: any
}

const EventsFound = ({ selectedEvent }: Props) => {
    const [getEventsByEvent, { loading: eventsLoading, error: eventsError, data: getEvents }] =
        useLazyQuery(GET_EVENTS_BY_EVENT)
    const [simulateRelays, setSimulateRelays] = useState<boolean>(false)
    const [simulateMedley, setSimulateMedley] = useState<boolean>(false)
    const [enabled, setEnabled] = useState<boolean>(false)
    const [simulatedRelayTime, setSimulatedRelayTime] = useState<string | null>(null)
    const [checked, setChecked] = useState<any>([])
    let [isOpen, setIsOpen] = useState<boolean>(false)
    const [flash, setFlash] = useState<boolean>(false)

    useEffect(() => {
        if (!selectedEvent) return
        setSimulateRelays(false)
        setSimulateMedley(false)
        setEnabled(false)
        getEventsByEvent({
            variables: {
                event: selectedEvent,
            },
        })
        checkIfEventIsMedleyRelay()
        checkIfSimulationIsAvailable()
    }, [selectedEvent])

    const numbers = getEvents?.getEventsByEvent
        .map((o: any) => {
            return o
        })
        .sort((a: any, b: any) => a.milliseconds - b.milliseconds)

    const checkIfSimulationIsAvailable = () => {
        if (selectedEvent.includes("relay")) {
            return setSimulateRelays(true)
        } else {
            return setSimulateRelays(false)
        }
    }
    const checkIfEventIsMedleyRelay = () => {
        if (selectedEvent.includes("Med.")) {
            return setSimulateMedley(true)
        } else {
            return setSimulateMedley(false)
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
            // console.log(present, `id found --> remove event.id ${event_id}`)
            updatedList.splice(updatedList.indexOf(event_id), 1)
        } else {
            // console.log(present, `id not found --> add event.id ${event_id}`)
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
        setFlash(true)
        const numbers = checked?.map((n: any) => {
            return n.event_milliseconds
        })
        const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const min: number = Math.floor(sum / 1000 / 60)
        const sec: any = ((sum / 1000) % 60).toFixed(2)
        const swimTime = "0" + min + ":" + sec
        setSimulatedRelayTime(swimTime)
        setTimeout(() => {
            setFlash(false)
        }, 600)
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
            <div className="mt-10 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    {" "}
                    <div
                        className={` mx-auto flex w-full justify-center ${
                            simulateRelays ? "visible" : "invisible"
                        }`}
                    >
                        <div
                            className={` flex w-full items-center space-x-2 ${
                                enabled && simulateRelays ? "visible" : "invisible"
                            }`}
                        >
                            <button
                                disabled={checked.length != 4}
                                className={`bg-white px-4 text-lg ${
                                    checked.length != 4 && "cursor-not-allowed"
                                }`}
                                onClick={calculate400FRSimulationTime}
                            >
                                calculate
                            </button>
                            <div
                                className={`items-center px-4 text-lg  ${
                                    flash ? "bg-green-100" : "bg-white"
                                } `}
                            >
                                <p> {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}</p>
                            </div>
                            <QuestionMarkCircleIcon
                                onClick={() => setIsOpen(true)}
                                className="h-3 w-3 cursor-pointer rounded-full bg-gray-400 text-gray-200 shadow"
                            />
                        </div>
                        <div className="mx-auto  flex items-center justify-center space-x-2">
                            <p className="ml-12">{!enabled ? "simulate" : "close"}</p>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={classNames(
                                    enabled ? "bg-white" : "bg-white",
                                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 focus:outline-none"
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabled
                                            ? "translate-x-5 bg-red-200"
                                            : "translate-x-0 bg-green-200",
                                        "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 focus:outline-none"
                                    )}
                                />
                            </Switch>
                            <DialogDemo isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    {" "}
                                    <table className="table">
                                        <thead className="thead">
                                            <tr>
                                                <th scope="col" className="col pl-2"></th>
                                                <th scope="col" className="col">
                                                    Rank
                                                </th>
                                                <th scope="col" className="col ">
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
                                                    <td className="row w-4 pl-2 pr-0">
                                                        <input
                                                            className={` radio ${
                                                                enabled && simulateRelays
                                                                    ? "visible"
                                                                    : "invisible"
                                                            } `}
                                                            type="checkbox"
                                                            value={event.id}
                                                            onChange={(e: any) =>
                                                                handleCheck(e, { event })
                                                            }
                                                        />
                                                    </td>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EventsFound
