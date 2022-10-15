import React from "react"

type Props = {}

const TableHeader = (props: Props) => {
    return (
        <thead className="thead">
            <tr>
                <th scope="col" className="col pl-7 text-xs">
                    Name
                </th>
                <th scope="col" className="col text-xs">
                    Grade
                </th>
                <th scope="col" className="col text-right text-xs">
                    Time
                </th>
            </tr>
        </thead>
    )
}

export default TableHeader
