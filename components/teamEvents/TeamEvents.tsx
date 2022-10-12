import { useLazyQuery } from "@apollo/client"
import { GET_EVENTS_BY_TEAM } from "graphql/queries"
import React, { useEffect } from "react"

type Props = {
    selectedTeam: any
}

const TeamEvents = ({ selectedTeam }: Props) => {
    const [getEventsByTeam, { error: teamError, loading: teamLoading, data: teamEvents }] =
        useLazyQuery(GET_EVENTS_BY_TEAM)

    useEffect(() => {
        if (!selectedTeam) {
            return
        } else {
            getEventsByTeam({
                variables: {
                    team: selectedTeam,
                },
            })
        }
    }, [selectedTeam])

    if (teamLoading) return <p className="loading">Loading ...</p>
    if (teamError) return <pre>{JSON.stringify(teamError, null, 2)}</pre>

    return (
        selectedTeam && (
            <div className="mt-10">
                <div className="overflow-y-auto">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th scope="col" className="col">
                                    Name
                                </th>
                                <th scope="col" className="col">
                                    Grade
                                </th>
                                <th scope="col" className="col">
                                    Events ({teamEvents?.getEventByTeam.length})
                                </th>
                                <th scope="col" className="col text-right">
                                    Time{" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {teamEvents?.getEventByTeam?.map((event: any, idx: number) => (
                                <tr key={idx} className="tr">
                                    <td className="row">{event.fullName}</td>
                                    <td className="row">{event.grade}</td>
                                    <td className="row">{event.event}</td>
                                    <td className="row text-right">{event.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )
}

export default TeamEvents
