import React from "react"

type Props = {
    grade: number
    time: number
}

const CommonColumns = ({ grade, time }: Props) => {
    return (
        <>
            <td className="row text-left text-xs">{grade}</td>
            <td className="row text-right text-xs">{time}</td>
        </>
    )
}

export default CommonColumns
