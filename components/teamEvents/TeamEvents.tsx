import { useLazyQuery } from "@apollo/client"
import { GET_EVENTS_BY_TEAM } from "graphql/queries"
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
    __typename: string
}

const TeamEvents = ({ selectedTeam, max }: Props) => {
    const [getEventsByTeam, { error: teamError, loading: teamLoading, data: teamEvents }] =
        useLazyQuery(GET_EVENTS_BY_TEAM)
    let [skip, setSkip] = useState(0)
    const [lastPage, setLastPage] = useState<boolean>(false)
    const [lastPageSize, setLastPageSize] = useState<number>()
    let [pageSize, setPageSize] = useState<number>(100)

    const handleSkipForward = () => {
        let x = skip + 100
        if (max - x < 100) {
            setLastPage(true)
            setSkip(skip + 100)
        } else {
            setLastPage(false)
            setSkip(skip + 100)
        }
    }

    const handleSkipBackward = () => {
        setLastPage(false)
        setSkip(skip - 100)
    }

    useEffect(() => {
        if (!selectedTeam) return
        if (max > pageSize) {
            pageSize = 100
        } else {
            pageSize = max
        }
        getEventsByTeam({
            variables: {
                team: selectedTeam.toString(),
                first: lastPage ? lastPageSize : pageSize,
                after: skip,
            },
        })
        setLastPageSize(Number((((max / pageSize) % 1) * 100).toFixed(0)))
    }, [selectedTeam, skip])

    if (teamLoading) return <p className="loading">Loading ...</p>
    if (teamError) return <pre className="w-40">{JSON.stringify(teamError, null, 2)}</pre>

    return (
        selectedTeam && (
            <div className="my-10">
                <Pagination
                    max={max}
                    skip={skip}
                    lastPage={lastPage}
                    onClickLeft={async () => handleSkipBackward()}
                    onClickRight={async () => handleSkipForward()}
                    showCount={true}
                />
                <div className="w-full overflow-x-auto  overflow-y-auto">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                {/* <th scope="col" className="col">
                                    #
                                </th> */}
                                <th scope="col" className="col">
                                    Name
                                </th>
                                <th scope="col" className="col">
                                    Grade
                                </th>
                                <th scope="col" className="col">
                                    Events
                                </th>
                                <th scope="col" className="col text-right">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {teamEvents?.getEventByTeam?.map((event: Event, idx: number) => (
                                <tr key={idx} className="tr">
                                    {/* <td className="row">{idx + 1}</td> */}
                                    <td className="row">{event.fullName}</td>
                                    <td className="row">{event.grade}</td>
                                    <td className="row">{event.event}</td>
                                    <td className="row text-right">{event.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex w-full justify-end">
                    <div>
                        <Pagination
                            max={max}
                            skip={skip}
                            lastPage={lastPage}
                            onClickLeft={async () => handleSkipBackward()}
                            onClickRight={async () => handleSkipForward()}
                        />
                    </div>
                </div>
            </div>
        )
    )
}

export default TeamEvents