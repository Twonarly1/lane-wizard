import React from "react"

type Props = {
    grade?: number
    time?: number
}

const CommonColumns = ({ grade, time }: Props) => {
    return (
        <>
            {grade && <td className="row pl-4 text-xs">{grade}</td>}
            {time && <td className="row text-right text-xs">{time}</td>}
        </>
    )
}

export default CommonColumns
