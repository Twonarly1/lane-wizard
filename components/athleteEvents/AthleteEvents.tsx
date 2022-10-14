import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { GET_EVENT_BY_ATHLETE } from "graphql/queries"

type Props = {
    selectedAthlete: any
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: string
    team: string
    time: string
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
        setTeamName(athletesEvents?.getEventByAthlete[0].team)
        setAthleteGrade(athletesEvents?.getEventByAthlete[0].grade)
        const athleteStats = athletesEvents?.getEventByAthlete.filter((athlete: any) => {
            return athlete.event == eventChosenToFilterBy
        })
        setEventsByEvent(athleteStats)
    }, [athletesEvents, eventChosenToFilterBy])

    useEffect(() => {
        if (!eventsByEvent) return
        calculateAvgSwimTime()
    }, [eventsByEvent])

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        selectedAthlete && (
            <div className="mt-10 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    {" "}
                    <div className="mt-5 flex flex-col">
                        <div className="flex justify-between">
                            <p>
                                {selectedAthlete}, {athleteGrade}
                            </p>
                            <p>{teamName}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col justify-between overflow-x-auto">
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="table">
                                            <thead className="thead">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="col pl-0 pr-7 text-center"
                                                    >
                                                        Event
                                                    </th>
                                                    <th scope="col" className="w-20"></th>
                                                    <th scope="col" className="col text-right">
                                                        Time
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                {athletesEvents?.getEventByAthlete?.map(
                                                    (event: Event, idx: number) => (
                                                        <tr key={idx} className="tr">
                                                            <td className="row w-4 pl-2 pr-0">
                                                                <button
                                                                    className="flex items-center"
                                                                    onClick={(e) =>
                                                                        handleEventFilter(e, {
                                                                            event,
                                                                        })
                                                                    }
                                                                >
                                                                    <input
                                                                        className="radio mr-2"
                                                                        type="checkbox"
                                                                        readOnly={true}
                                                                        checked={isCheckedSelected(
                                                                            event.id
                                                                        )}
                                                                    />
                                                                    <p> {event.event}</p>
                                                                </button>
                                                            </td>
                                                            <td className="row w-20"> </td>
                                                            <td className="row">{event.time}</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {eventsByEvent.length === 0 ? (
                    <div className="mt-10 text-xs">select individual event for more stats</div>
                ) : (
                    <>
                        {eventChosenToFilterBy && (
                            <div className="mt-10 flex justify-between">
                                <p>{eventChosenToFilterBy}</p>
                            </div>
                        )}
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="table">
                                            <thead className="thead">
                                                <tr>
                                                    <th scope="col" className="col">
                                                        #
                                                    </th>
                                                    <th scope="col" className="col">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="col text-right">
                                                        Time
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                {eventsByEvent?.map((event: any, idx: number) => (
                                                    <tr key={idx} className="tr">
                                                        <td className="row">{idx}</td>
                                                        <td className="row">{event.date}</td>
                                                        <td className="row">{event.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {averageEventTime && (
                                            <table className="table ">
                                                <thead className="thead">
                                                    <tr className="bg-gray-200">
                                                        <th scope="col" className="col">
                                                            avg
                                                        </th>
                                                        <th scope="col" className="col text-right">
                                                            {averageEventTime}
                                                        </th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    )
}

export default AthleteEvents
