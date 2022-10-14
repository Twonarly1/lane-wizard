import React, { useState } from "react"
import { useEffect } from "react"

type Props = {
    medleyEvents: any
    setBackstrokeValue?: any
    backstrokeValue?: any
    setBreastrokeValue?: any
    breaststrokeValue?: any
    setFlyValue?: any
    flyValue?: any
    setFreeValue?: any
    freeValue?: any
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: number
    team: string
    time: any
    __typename: string
}

const Table = ({
    medleyEvents,
    setBackstrokeValue,
    backstrokeValue,
    setBreastrokeValue,
    breaststrokeValue,
    setFlyValue,
    flyValue,
    setFreeValue,
    freeValue,
}: Props) => {
    const [checked, setChecked] = useState<any>(false)
    const [selectedCheckedBtn, setSelectedRadioBtn] = React.useState<any>()
    const isCheckedSelected = (value: string): boolean => selectedCheckedBtn === value
    const [events, setEvents] = useState<any>([])

    const handleEventFilter = (e: any, params: any) => {
        let event = params.event
        const event_milliseconds: number = params.event.milliseconds
        var updatedList = [...events]
        setSelectedRadioBtn(params.event.id)
        if (event === "Med. BA") {
            return (updatedList = [...events, event_milliseconds])
        }
        if (event === "Med. BR") {
            updatedList = [...events, event_milliseconds]
        }
        if (event === "Med. FL") {
            updatedList = [...events, event_milliseconds]
        }
        if (event === "Med. FR") {
            updatedList = [...events, event_milliseconds]
        }
        console.log("HERE", updatedList)

        setEvents(updatedList)
    }

    useEffect(() => {
        if (!events) return
        console.log(events)
    }, [events])

    // console.log(selectedCheckedBtn)

    return (
        <div className="mx-auto flex  w-full flex-col text-center">
            {medleyEvents?.getEventsByEvent[0].event}

            <div className="mt-2 h-80 overflow-x-auto overflow-y-auto">
                <div className="inline-block align-middle ">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="table ">
                            <thead className="thead">
                                <tr>
                                    <th scope="col" className="col pl-7 text-xs">
                                        Name
                                    </th>
                                    <th scope="col" className="col text-xss text-right">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {medleyEvents?.getEventsByEvent?.map(
                                    (event: Event, idx: number) => (
                                        <tr key={idx} className="tr ">
                                            <td>
                                                <button
                                                    className="flex items-center"
                                                    onClick={(e) => handleEventFilter(e, { event })}
                                                >
                                                    <input
                                                        className="radio mr-2 ml-2"
                                                        type="checkbox"
                                                        readOnly={true}
                                                        checked={isCheckedSelected(event.id)}
                                                    />
                                                    {event.fullName}
                                                </button>
                                            </td>

                                            <td className="row text-right text-xs">{event.time}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
