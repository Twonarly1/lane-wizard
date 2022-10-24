import { millisecondsToMinutes } from "lib/utils"
import React from "react"

type Props = {
    id?: number
    name?: string
    event?: string
    grade?: number
    time?: number | string
    date?: string
    ms?: any
    last?: boolean
}

const CommonColumns = ({ id, name, event, grade, time, date, ms, last }: Props) => {
    return (
        <>
            {id && <td className="row pl-4 text-xs md:text-sm">{id}</td>}
            {event && <td className="row pl-0 pr-6 text-xs md:text-sm">{event}</td>}

            {name && <td className="row pl-0  text-xs md:text-sm">{name}</td>}
            {grade && <td className="row pl-2 text-xs md:text-sm">{grade}</td>}
            {date && (
                <td className="row pl-2 text-xs md:text-sm">
                    {date.slice(5, 7) + "," + date.slice(8, 10) + "/" + date.slice(2, 4)}
                </td>
            )}
            {time && <td className="row px-2 text-right text-xs md:text-sm">{time}</td>}
            {ms && (
                <td className={`row px-2 text-right text-xs md:text-sm ${last && "bg-green-100"}`}>
                    {millisecondsToMinutes(ms)}
                </td>
            )}
        </>
    )
}

export default CommonColumns
