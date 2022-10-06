import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { GET_ATHLETES, GET_EVENTS, GET_EVENTS_BY_EVENT, GET_EVENT_USING_ATHLETE } from '../graphql/queries'

type Props = {}

const All = (props: Props) => {
    const [athleteIds, setAthleteIds] = useState<string[]>([])
    const { data } = useQuery(GET_ATHLETES)
    const { data: events } = useQuery(GET_EVENTS)
    const [allData, setAllData] = useState<Array<any>>([])
      
    console.log(events?.getEventList);


  return (
      <div className="w-full bg-gray-200 overflow-x-auto  justify-between flex flex-col">
      <Header /> 
        {events && 
          <div className='mx-auto text-sm py-4'> 
            counting {events?.getEventList.length} 
          </div>
        }
        <div className="inline-block  py-2">
            <div className="overflow-y-auto">
                <table className="w-[300px] md:w-[400px] mx-auto divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-3 py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">
                                Name
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Event
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Time
                            </th>
                          
                        </tr>
                    </thead>
                    <tbody className="bg-white text-xs">
                        {events?.getEventList?.map((event: any, idx: number) => (
                            <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                <td className="whitespace-nowrap pl-4 pr-3  font-medium text-gray-900 sm:pl-6">
                                    {event.fullName}
                                </td>
                                <td className="whitespace-nowrap pl-4 pr-3  font-medium text-gray-900 sm:pl-6">
                                    {event.event}
                                </td>
                                <td className="whitespace-nowrap px-3   text-gray-500">{event.time}</td>
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

export default All