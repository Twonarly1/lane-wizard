import { useLazyQuery } from "@apollo/client"
import { GET_EVENTS_BY_EVENT } from "graphql/queries"
import React, { useEffect } from "react"

type Props = {
    selectedEvent: any
}

const EventsFound = ({ selectedEvent }: Props) => {
    const [getEventsByEvent, { loading: eventsLoading, error: eventsError, data: getEvents }] =
        useLazyQuery(GET_EVENTS_BY_EVENT)

    useEffect(() => {
        if (!selectedEvent) {
            return
        } else {
            getEventsByEvent({
                variables: {
                    event: selectedEvent.name,
                },
            })
        }
    }, [selectedEvent])

    const numbers = getEvents?.getEventsByEvent.map((o: any) => {
        return o
    })
    numbers?.sort(compareFunction)

    function compareFunction(a: any, b: any) {
        return a.milliseconds - b.milliseconds
    }

    if (eventsLoading) return <p className="loading">Loading ...</p>
    if (eventsError) return <pre>{JSON.stringify(eventsError, null, 2)}</pre>

    return (
        selectedEvent && (
            <div className="mt-10">
                <div className="flex flex-col justify-between overflow-x-auto">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th scope="col" className="col">
                                    Rank
                                </th>
                                <th scope="col" className="col">
                                    Name
                                </th>
                                <th scope="col" className="col text-right">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {numbers?.map((event: any, idx: number) => (
                                <tr key={idx} className="tr">
                                    <td className="row">{idx + 1}</td>
                                    <td className="row">{event.fullName}</td>
                                    <td className="row">{event.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )
}

export default EventsFound
