import React from 'react'

type Props = {
    selectedEvent: any
    numbers: any
}

const EventsFound = ({selectedEvent, numbers}: Props) => {
  return (
    selectedEvent 
        &&
        <div className="mt-10">
            <div className="overflow-x-auto justify-between flex flex-col">
                <div className="overflow-hidden">
                    <table className=" divide-y divide-gray-300 w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="col">Rank</th>
                                <th scope="col" className="col">Name</th>
                                <th scope="col" className="col text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-xs">
                            {numbers?.map((event: any, idx: number) => (
                                <tr key={idx} className='odd:bg-gray-50 bg-white'>
                                    <td className="row">{idx + 1}</td>
                                    <td className="row">
                                        {event.fullName}
                                    </td>
                                    <td className="row text-right">{event.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
        
  )
}

export default EventsFound