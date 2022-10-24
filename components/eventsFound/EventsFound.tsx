import { useLazyQuery } from "@apollo/client"
import { Switch } from "@headlessui/react"
import { CalculatorIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { CommonColumns, TableHeader } from "components/table"
import { GET_EVENTS_BY_TEAM_AND_EVENT, GET_TEAMEVENTS_BY_TEAM_AND_EVENT } from "graphql/queries"
import { classNames } from "lib/utils"
import React, { useEffect, useState } from "react"
import DialogDemo from "./DialogDemo"

type Props = {
    selectedEvent: any
    selectedTeam: string
}

const EventsFound = ({ selectedEvent, selectedTeam }: Props) => {
    const [
        getEventsByTeamAndEvent,
        { loading: eventsLoading, error: eventsError, data: getEvents },
    ] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [getTeamEventsByTeamAndEvent, { loading, error, data: getTeamEvents, refetch }] =
        useLazyQuery(GET_TEAMEVENTS_BY_TEAM_AND_EVENT)
    const [simulateRelays, setSimulateRelays] = useState<boolean>(false)
    const [simulateMedley, setSimulateMedley] = useState<boolean>(false)
    const [enabled, setEnabled] = useState<boolean>(false)
    const [simulatedRelayTime, setSimulatedRelayTime] = useState<string | null>(null)
    const [checked, setChecked] = useState<any>([])
    let [isOpen, setIsOpen] = useState<boolean>(false)
    const [flash, setFlash] = useState<boolean>(false)

    console.log(selectedEvent)

    useEffect(() => {
        if (!selectedEvent) return
        setSimulateRelays(false)
        setSimulateMedley(false)
        setEnabled(false)
        getEventsByTeamAndEvent({
            variables: {
                team: selectedTeam,
                event: selectedEvent,
            },
        })
        getTeamEventsByTeamAndEvent({
            variables: {
                team: selectedTeam,
                event: selectedEvent,
            },
        })
        checkIfEventIsMedleyRelay()
        checkIfSimulationIsAvailable()
    }, [selectedEvent])

    const events = getEvents?.getEventsByTeamAndEvent
        .map((o: any) => {
            return o
        })
        .sort((a: any, b: any) => a.milliseconds - b.milliseconds)
    const teamEvents = getTeamEvents?.getTeamEventsByTeamAndEvent
        .map((o: any) => {
            return o
        })
        .sort((a: any, b: any) => a.milliseconds - b.milliseconds)

    const checkIfSimulationIsAvailable = () => {
        if (selectedEvent == "400 FR") {
            setSimulateRelays(true)
        } else {
            if (selectedEvent == "200 FR") {
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
                {!selectedEvent.includes("Team") ? (
                    <div className="mt-2 flex flex-col">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="table ">
                                <TableHeader name={true} grade={true} date={true} time={true} />
                                <tbody className="tbody">
                                    {events?.map((event: any, idx: number) => (
                                        <tr key={idx} className="tr">
                                            {/* <CommonColumns id={idx + 1} /> */}
                                            <td className="flex items-center">
                                                <p className="pl-2 pr-0"> {event.fullName}</p>

                                                <input
                                                    className={`radio  ml-2 cursor-pointer ${
                                                        enabled && simulateRelays
                                                            ? "visible"
                                                            : "invisible"
                                                    } `}
                                                    type="checkbox"
                                                    value={event.id}
                                                    onChange={(e: any) => handleCheck(e, { event })}
                                                    // checked={}
                                                />
                                            </td>
                                            <CommonColumns
                                                grade={event.grade}
                                                time={event.time}
                                                date={event.date}
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 flex flex-col">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="table ">
                                <TableHeader
                                    id={true}
                                    event={true}
                                    name={true}
                                    grade={true}
                                    date={true}
                                    time={true}
                                    total={true}
                                />
                                {teamEvents?.map((event: any, idx: number) => (
                                    <tbody key={idx} className="tbody">
                                        <tr className="tr">
                                            <CommonColumns
                                                id={idx + 1}
                                                event={event.ath1.event}
                                                name={event.ath1.fullName}
                                                grade={event.ath1.grade}
                                                date={event.ath1.date}
                                                time={event.ath1.time}
                                                ms={event.ath1.milliseconds}
                                                last={false}
                                            />
                                        </tr>
                                        <tr className="tr">
                                            <CommonColumns
                                                id={idx + 1}
                                                event={event.ath2.event}
                                                name={event.ath2.fullName}
                                                grade={event.ath2.grade}
                                                date={event.ath2.date}
                                                time={event.ath2.time}
                                                ms={
                                                    event.ath1.milliseconds +
                                                    event.ath2.milliseconds
                                                }
                                                last={false}
                                            />
                                        </tr>
                                        <tr className="tr">
                                            <CommonColumns
                                                id={idx + 1}
                                                event={event.ath3.event}
                                                name={event.ath3.fullName}
                                                grade={event.ath3.grade}
                                                date={event.ath3.date}
                                                time={event.ath3.time}
                                                ms={
                                                    event.ath1.milliseconds +
                                                    event.ath2.milliseconds +
                                                    event.ath3.milliseconds
                                                }
                                                last={false}
                                            />
                                        </tr>
                                        <tr className="tr ">
                                            <CommonColumns
                                                id={idx + 1}
                                                event={event.ath4.event}
                                                name={event.ath4.fullName}
                                                grade={event.ath4.grade}
                                                date={event.ath4.date}
                                                time={event.ath4.time}
                                                ms={
                                                    event.ath1.milliseconds +
                                                    event.ath2.milliseconds +
                                                    event.ath3.milliseconds +
                                                    event.ath4.milliseconds
                                                }
                                                last={true}
                                            />
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )
    )
}

export default EventsFound
