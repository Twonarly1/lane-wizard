import { useLazyQuery } from "@apollo/client"
import { Switch } from "@headlessui/react"
import { CalculatorIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { CommonColumns, TableHeader } from "components/medley"
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
        if (selectedEvent.includes("400 FR")) {
            setSimulateRelays(true)
        } else {
            if (selectedEvent.includes("200 FR")) {
                setSimulateRelays(true)
            } else {
                setSimulateRelays(false)
            }
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
        const numbers = checked?.map((n: any) => {
            return n.event_milliseconds
        })
        const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const min: number = Math.floor(sum / 1000 / 60)
        const sec: any = ((sum / 1000) % 60).toFixed(2)
        const swimTime = "0" + min + ":" + sec
        setSimulatedRelayTime(swimTime)
        setFlash(true)
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
            <div className="mt-10 px-4">
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
                            className={`rounded bg-white px-4 text-lg shadow ring-1 ring-black ring-opacity-5 ${
                                checked.length != 4 && "cursor-not-allowed"
                            }`}
                            onClick={calculate400FRSimulationTime}
                        >
                            calculate
                        </button>
                        <div
                            className={`items-center rounded px-4 text-lg shadow ring-1 ring-black ring-opacity-5 ${
                                flash ? "bg-green-100" : "bg-white"
                            } `}
                        >
                            <p> {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}</p>
                        </div>
                        <QuestionMarkCircleIcon
                            onClick={() => setIsOpen(true)}
                            className="h-5 w-5 cursor-pointer rounded-full  text-gray-500"
                        />
                    </div>
                    <div className="mx-auto  flex items-center justify-center space-x-1">
                        {/* <p className="ml-12">{!enabled ? "simulate" : "close"}</p> */}
                        <CalculatorIcon className="h-5 w-5 text-gray-500" />
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
                <div className="mt-2 flex flex-col">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {" "}
                        <table className="table">
                            <TableHeader />
                            <tbody className="tbody">
                                {numbers?.map((event: any, idx: number) => (
                                    <tr key={idx} className="tr">
                                        <td className="flex items-center">
                                            <input
                                                className={`radio mr-2 ml-2 cursor-pointer ${
                                                    enabled && simulateRelays
                                                        ? "visible"
                                                        : "invisible"
                                                } `}
                                                type="checkbox"
                                                value={event.id}
                                                onChange={(e: any) => handleCheck(e, { event })}
                                                // checked={}
                                            />
                                            <p className="items-center"> {event.fullName}</p>
                                        </td>
                                        {/* <td className="row ">
                                            {event.fullName}
                                            <span className="text-[8px]">, {event.grade}</span>
                                        </td> */}
                                        {/* <td className="row pl-4 text-[10px]">
                                            {event.team},{event.grade}
                                        </td> */}
                                        {/* <td className="row pl-4 text-[10px]">
                                            {event.date.slice(5, 7) +
                                                "," +
                                                event.date.slice(8, 10) +
                                                "/" +
                                                event.date.slice(2, 4)}
                                        </td> */}
                                        <CommonColumns grade={event.grade} time={event.time} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    )
}

export default EventsFound
