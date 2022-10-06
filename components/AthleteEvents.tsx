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
    <div className="mt-2 w-full overflow-x-auto justify-between flex flex-col">
        <div className="inline-block  py-2">
            <div className="overflow-hidden">
                <table className="w-[350px] divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Event
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Time
                            </th>
                            {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Milliseconds
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {athlete?.map((event: any, idx: number) => (
                            <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {event.event}
                                </td>
                                <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">{event.time}</td>
                                {/* <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">{event.milliseconds}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
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