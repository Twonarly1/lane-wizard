import { useLazyQuery } from "@apollo/client"
import { CommonColumns, TableHeader } from "components/table"
import { GET_EVENTS_BY_TEAM, GET_TEAMEVENTS_BY_TEAM } from "graphql/queries"
import React, { useEffect, useState } from "react"
import Pagination from "./Pagination"

type Props = {
    selectedTeam: any
    max: number
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: number
    team: string
    time: string
    date: string
    __typename: string
}

const TeamEvents = ({ selectedTeam, max }: Props) => {
    const [getEventsByTeam, { error: teamError, loading: teamLoading, data: events }] =
        useLazyQuery(GET_EVENTS_BY_TEAM)
    const [
        getTeamEventsByTeam,
        { error: teamEventsError, loading: teamEventsLoading, data: teamEvents },
    ] = useLazyQuery(GET_TEAMEVENTS_BY_TEAM)
    let [skip, setSkip] = useState(0)
    const [lastPage, setLastPage] = useState<boolean>(false)
    const [lastPageSize, setLastPageSize] = useState<number>()
    let [pageSize, setPageSize] = useState<number>(100)

    // const handleSkipForward = () => {
    //     let x = skip + 100
    //     if (max - x < 100) {
    //         setLastPage(true)
    //         setSkip(skip + 100)
    //     } else {
    //         setLastPage(false)
    //         setSkip(skip + 100)
    //     }
    // }

    // const handleSkipBackward = () => {
    //     setLastPage(false)
    //     setSkip(skip - 100)
    // }

    useEffect(() => {
        if (!selectedTeam) return
        // if (max > pageSize) {
        //     pageSize = 100
        // } else {
        //     pageSize = max
        // }
        getTeamEventsByTeam({
            variables: {
                team: selectedTeam.toString(),
            },
        })

        getEventsByTeam({
            variables: {
                team: selectedTeam.toString(),
            },
        })

        setLastPageSize(Number((((max / pageSize) % 1) * 100).toFixed(0)))
    }, [selectedTeam, skip])

    if (teamLoading) return <p className="loading">Loading ...</p>
    if (teamError) return <pre className="w-40">{JSON.stringify(teamError, null, 2)}</pre>

    return (
        selectedTeam && (
            <div className="mt-10">
                <div className="">
                    {/* <Pagination
                        max={max}
                        skip={skip}
                        lastPage={lastPage}
                        onClickLeft={async () => handleSkipBackward()}
                        onClickRight={async () => handleSkipForward()}
                        showCount={true}
                    /> */}
                    <div className="mt-2 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="table min-w-full">
                                        <TableHeader
                                            id={true}
                                            event={true}
                                            name={true}
                                            grade={true}
                                            date={true}
                                            time={true}
                                        />
                                        <tbody className="tbody">
                                            {events?.getEventByTeam?.map(
                                                (event: Event, idx: number) => (
                                                    <tr key={idx} className="tr">
                                                        <CommonColumns
                                                            id={idx + 1}
                                                            name={event.fullName}
                                                            event={event.event}
                                                            grade={event.grade}
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
                        </div>
                    </div>
                    {teamEvents?.getTeamEventsByTeam.length != 0 && (
                        <div className="mt-10 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="table min-w-full">
                                            <TableHeader
                                                id={true}
                                                event={true}
                                                name={true}
                                                grade={true}
                                                date={true}
                                                time={true}
                                                total={true}
                                            />

                                            {teamEvents?.getTeamEventsByTeam?.map(
                                                (event: any, idx: number) => (
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
                                                )
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <div className="flex w-full justify-end">
                        <div>
                            <Pagination
                                max={max}
                                skip={skip}
                                lastPage={lastPage}
                                onClickLeft={async () => handleSkipBackward()}
                                onClickRight={async () => handleSkipForward()}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        )
    )
}

export default TeamEvents
