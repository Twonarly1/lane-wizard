import React from 'react'

type Props = {
    athlete: any
    loading: boolean
    error: undefined | string
}

const AthleteEvents = ({athlete, loading, error}: Props) => {
    if (loading) return <p>Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    athlete && (

    <div className="w-full overflow-x-auto justify-between flex flex-col">
            <div className="overflow-hidden">
                <table className="w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="col">
                                Event
                            </th>
                            <th scope="col" className="col text-right">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-xs">
                        {athlete?.map((event: any, idx: number) => (
                            <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                <td className="row">
                                    {event.event}
                                </td>
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

export default AthleteEvents

{/* <div className="">
{eData?.getEventUsingAthlete.map((item: any, i: number) => {
    return (
        <div key={i} className="flex w-80 justify-between border border-black">
            <p>{item.event}</p>
            <p className="">{item.time}</p>
        </div>
    )
})}
</div> */}