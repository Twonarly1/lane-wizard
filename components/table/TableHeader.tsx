import React from "react"

type Props = {
    id?: boolean
    event?: boolean
    name?: boolean
    grade?: boolean
    date?: boolean
    time?: boolean
    total?: boolean
}

const TableHeader = ({ id, event, name, grade, date, time, total }: Props) => {
    return (
        <thead className="thead">
            <tr>
                {id && (
                    <th scope="col" className="col pl-4 text-xs">
                        #
                    </th>
                )}
                {event && (
                    <th scope="col" className="col pl-0 text-xs">
                        Event
                    </th>
                )}
                {name && (
                    <th scope="col" className={` col text-xs ${!id && !event ? "pl-2" : "pl-0"}`}>
                        Name
                    </th>
                )}
                {grade && (
                    <th scope="col" className="col pl-2 text-xs">
                        gr
                    </th>
                )}
                {date && (
                    <th scope="col" className="col pl-2 text-xs">
                        Date
                    </th>
                )}
                {time && (
                    <th scope="col" className="col text-right text-xs">
                        Time
                    </th>
                )}
                {total && (
                    <th scope="col" className="col  text-xs">
                        Total
                    </th>
                )}
            </tr>
        </thead>
    )
}

export default TableHeader
