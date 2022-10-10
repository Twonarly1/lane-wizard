import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect } from "react"
import { GET_EVENT_BY_ATHLETE } from "graphql/queries"

type Props = {
    selectedAthlete: any
}

const AthleteEvents = ({ selectedAthlete }: Props) => {
    const [getEventsByAthlete, { loading, error, data: athletesEvents, refetch }] =
        useLazyQuery(GET_EVENT_BY_ATHLETE)

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
    }, [selectedAthlete])

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        selectedAthlete && (
            <div className="mt-10">
                <div className="flex flex-col justify-between overflow-x-auto">
                    <div className="overflow-hidden ">
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                    <th scope="col" className="col">
                                        #
                                    </th>
                                    <th scope="col" className="col">
                                        Event
                                    </th>
                                    <th scope="col" className="col text-right">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {athletesEvents?.getEventByAthlete?.map(
                                    (event: any, idx: number) => (
                                        <tr key={idx} className="tr">
                                            <td className="row">{idx}</td>
                                            <td className="row">{event.event}</td>
                                            <td className="row">{event.time}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    )
}

export default AthleteEvents
