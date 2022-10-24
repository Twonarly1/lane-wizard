import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { GET_EVENT_BY_ATHLETE } from "graphql/queries"
import { byDate } from "lib/utils"
import CommonColumns from "components/table/CommonColumns"
import TableHeader from "components/table/TableHeader"

type Props = {
    selectedAthlete: any
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: any
    team: string
    time: string
    date: string
    __typename: string
}

const AthleteEvents = ({ selectedAthlete }: Props) => {
    const [getEventsByAthlete, { loading, error, data: athletesEvents, refetch }] =
        useLazyQuery(GET_EVENT_BY_ATHLETE)
    const [eventChosenToFilterBy, setEventChosenToFilterBy] = useState<string>("")
    const [eventsByEvent, setEventsByEvent] = useState<any[]>([])
    const [averageEventTime, setAverageEventTime] = useState<any>()
    const [teamName, setTeamName] = useState<string>("")
    const [athleteGrade, setAthleteGrade] = useState<string>("")
    const [checked, setChecked] = useState<any>(false)
    const [selectedCheckedBtn, setSelectedRadioBtn] = React.useState<any>()
    const isCheckedSelected = (value: string): boolean => selectedCheckedBtn === value
    const [eventsByEventSortedByDate, setEventsByEventSortedByDate] = useState<any>([])
    useEffect(() => {
        if (!selectedAthlete) return
        getEventsByAthlete({
            variables: {
                fullName: selectedAthlete,
            },
        })
    }, [selectedAthlete])

    const handleEventFilter = (e: any, params: any) => {
        setSelectedRadioBtn(params.event.id)
        setEventChosenToFilterBy(params.event.event)
    }

    const calculateAvgSwimTime = () => {
        setAverageEventTime(null)
        if (eventsByEvent.length === 1) {
            return
        } else {
            const numbers = eventsByEvent?.map((n: any) => {
                return n.milliseconds
            })
            const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
            const avg: number = sum / numbers.length
            const min: number = Math.floor(avg / 1000 / 60)
            const sec: any = ((avg / 1000) % 60).toFixed(2)
            const swimTime = "0" + min + ":" + sec
            setAverageEventTime(swimTime)
        }
    }

    useEffect(() => {
        if (!athletesEvents) return
        setTeamName(athletesEvents?.getEventByAthlete[0]?.team)
        setAthleteGrade(athletesEvents?.getEventByAthlete[0]?.grade)
        const athleteStats = athletesEvents?.getEventByAthlete.filter((athlete: any) => {
            return athlete.event == eventChosenToFilterBy
        })
        setEventsByEvent(athleteStats)
    }, [athletesEvents, eventChosenToFilterBy])

    useEffect(() => {
        if (!eventsByEvent) return
        calculateAvgSwimTime()
        setEventsByEventSortedByDate(eventsByEvent.sort(byDate))
    }, [eventsByEvent])

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        selectedAthlete && (
            <div className="mt-5">
                <div className="mt-5 flex flex-col">
                    <div className="flex justify-between">
                        <p>
                            {selectedAthlete}, {athleteGrade}
                        </p>
                        <p>{teamName}</p>
                    </div>
                </div>
                {athletesEvents.getEventByAthlete.length != 0 && (
                    <div className="mt-2 flex flex-col justify-between overflow-x-auto rounded shadow ring-1 ring-black ring-opacity-5">
                        <div className="overflow-hidden ">
                            <table className="table">
                                <TableHeader id={true} event={true} date={true} time={true} />
                                <tbody className="tbody">
                                    {athletesEvents?.getEventByAthlete?.map(
                                        (event: Event, idx: number) => (
                                            <tr key={idx} className="tr">
                                                <CommonColumns id={idx + 1} />
                                                <td className="row w-4 pl-0 pr-4">
                                                    <button
                                                        className="flex items-center"
                                                        onClick={(e) =>
                                                            handleEventFilter(e, { event })
                                                        }
                                                    >
                                                        <input
                                                            className="radio mr-2"
                                                            type="checkbox"
                                                            readOnly={true}
                                                            checked={isCheckedSelected(event.id)}
                                                        />
                                                        <p> {event.event}</p>
                                                    </button>
                                                </td>
                                                <CommonColumns
                                                    date={event.date}
                                                    time={event.time}
                                                />
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {eventsByEvent.length === 0 ? (
                    <div className="mt-10 text-xs">select individual event for more stats</div>
                ) : (
                    <>
                        {eventChosenToFilterBy && (
                            <div className="mt-10 flex items-center justify-between">
                                <p className="">{eventChosenToFilterBy}</p>
                                <p className="rounded bg-white px-4 text-lg shadow ring-1 ring-black ring-opacity-5">
                                    <span className="mr-2">
                                        <b>avg:</b>
                                    </span>
                                    {averageEventTime}
                                </p>
                            </div>
                        )}
                        <div className="mt-2 flex flex-col justify-between overflow-x-auto rounded shadow ring-1 ring-black ring-opacity-5">
                            <div className="overflow-hidden ">
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-2">
                                                #
                                            </th>
                                            <th scope="col" className="col pl-2">
                                                Date
                                            </th>
                                            <th scope="col" className="w-20 pl-0 pr-7"></th>
                                            <th
                                                scope="col"
                                                className="col w-20 bg-blue-50 text-right"
                                            >
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {eventsByEvent
                                            ?.sort(
                                                (a: any, b: any) => a.milliseconds - b.milliseconds
                                            )
                                            .map((event: Event, idx: number) => (
                                                <tr key={idx} className="tr">
                                                    <td className="row pl-2">{idx + 1}</td>
                                                    {/* <td className="row">{event.date}</td> */}
                                                    <CommonColumns date={event.date} />
                                                    <td className="row"></td>
                                                    <td className="row bg-blue-50">{event.time}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-2 mb-10 flex flex-col justify-between overflow-x-auto rounded shadow ring-1 ring-black ring-opacity-5">
                            <div className="overflow-hidden ">
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-2">
                                                #
                                            </th>
                                            <th scope="col" className="col bg-blue-50 pl-2">
                                                Date
                                            </th>
                                            <th scope="col" className="col pr-6 text-right">
                                                %∆
                                            </th>
                                            <th scope="col" className="col text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {eventsByEvent
                                            ?.sort(byDate)
                                            .map((event: any, idx: number) => (
                                                <tr key={idx} className="tr">
                                                    <td className="row pl-2">{idx + 1}</td>
                                                    {/* <td className="row">{event.date}</td> */}
                                                    <td className="row bg-blue-50 pl-2">
                                                        {event.date.slice(5, 7) +
                                                            "," +
                                                            event.date.slice(8, 10) +
                                                            "/" +
                                                            event.date.slice(2, 4)}
                                                    </td>
                                                    {/* <td className="row">
                                                        {(
                                                            ((eventsByEvent[idx + 1].milliseconds -
                                                                event.milliseconds) /
                                                                eventsByEvent[idx + 1]
                                                                    .milliseconds) *
                                                            100
                                                        ).toFixed(2)}
                                                            </td> */}
                                                    <td className="row pl-2 pr-6 text-right">
                                                        {(
                                                            ((eventsByEvent[idx + 1]?.milliseconds -
                                                                event.milliseconds) /
                                                                eventsByEvent[idx + 1]
                                                                    ?.milliseconds) *
                                                            100
                                                        ).toFixed(2)}
                                                    </td>
                                                    <td className="row w-20">{event.time}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    )
}

export default AthleteEvents
