import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { GET_EVENT_BY_ATHLETE } from "graphql/queries"
import { minTime } from "lib/utils"

type Props = {
    selectedAthlete: any
}

type Athlete = {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
}

const AthleteEvents = ({ selectedAthlete }: Props) => {
    const [getEventsByAthlete, { loading, error, data: athletesEvents, refetch }] =
        useLazyQuery(GET_EVENT_BY_ATHLETE)
    const [eventChosenToFilterBy, setEventChosenToFilterBy] = useState<string>("")
    const [eventsByEvent, setEventsByEvent] = useState<any>()
    const [averageEventTime, setAverageEventTime] = useState<number | undefined>(undefined)
    const [bestEventTime, setBestEventTime] = useState<number>(0)
    const [teamName, setTeamName] = useState<string>("")
    const [athleteGrade, setAthleteGrade] = useState<string>("")

    useEffect(() => {
        if (!selectedAthlete) {
            return
        } else {
            getEventsByAthlete({
                variables: {
                    fullName: selectedAthlete,
                },
            })
        }
        if (!athletesEvents) {
            return
        } else {
            setTeamName(athletesEvents?.getEventByAthlete[0].team)
            setAthleteGrade(athletesEvents?.getEventByAthlete[0].grade)
        }
    }, [selectedAthlete, athletesEvents])

    const handleEventFilter = (e: any, params: any) => {
        setEventChosenToFilterBy(params.event.event)
    }

    const arrAvg = (arr: any[]) => {
        const newArray = arr?.map((event: any) => {
            return event.milliseconds
        })
        const average: number = newArray?.reduce((a, b) => a + b, 0) / newArray?.length
        setAverageEventTime(average)
        setBestEventTime(minTime(newArray))
    }

    useEffect(() => {
        const athleteStats = athletesEvents?.getEventByAthlete.filter((athlete: any) => {
            return athlete.event == eventChosenToFilterBy
        })
        setEventsByEvent(athleteStats)
    }, [eventChosenToFilterBy])

    useEffect(() => {
        if (!eventsByEvent) {
            return
        } else {
            arrAvg(eventsByEvent)
        }
    }, [eventsByEvent])

    // console.log(athletesEvents?.getEventByAthlete[0].team)
    console.log(teamName)

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
                <div className="mt-2 flex flex-col justify-between overflow-x-auto">
                    <div className="overflow-hidden ">
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                    {/* <th scope="col" className="col">
                                        #
                                    </th> */}
                                    <th scope="col" className="col">
                                        Event
                                    </th>
                                    {/* <th scope="col" className="col">
                                        Team
                                    </th> */}
                                    <th scope="col" className="col text-right">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {athletesEvents?.getEventByAthlete?.map(
                                    (event: any, idx: number) => (
                                        <tr key={idx} className="tr">
                                            {/* <td className="row">{idx}</td> */}
                                            <td className="row">
                                                <button
                                                    className="underline decoration-gray-400"
                                                    onClick={(e: any) =>
                                                        handleEventFilter(e, { event })
                                                    }
                                                >
                                                    {event.event}
                                                </button>
                                            </td>
                                            {/* <td className="row">{event.team}</td> */}
                                            <td className="row">{event.time}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-10 text-xs">select individual event for more stats</div>
                {eventsByEvent && (
                    <>
                        {averageEventTime && (
                            <div className="mt-5 flex justify-between">
                                <p>{eventChosenToFilterBy}</p>
                                <p>{(averageEventTime / 1000).toFixed(2)} avg</p>
                            </div>
                        )}
                        <div className="mt-2 flex flex-col justify-between overflow-x-auto">
                            <div className="overflow-hidden ">
                                <table className="table">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col">
                                                #
                                            </th>
                                            {/* <th scope="col" className="col">
                                                Team
                                            </th> */}
                                            <th scope="col" className="col text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {eventsByEvent?.map((event: any, idx: number) => (
                                            <tr key={idx} className="tr">
                                                <td className="row">{idx}</td>
                                                {/* <td className="row">{event.team}</td> */}
                                                <td className="row">{event.time}</td>
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
