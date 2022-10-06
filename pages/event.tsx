import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import EventDropdown from '../components/EventDropdown'
import { GET_EVENTS_BY_EVENT } from '../graphql/queries'
import eventList from "../eventList.json"
import Header from '../components/Header'
import Link from 'next/link'

const event = () => {
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState<any>("")

    const filteredEvents: any =
      query === ''
        ? eventList
        : eventList.filter((event) => {
            return event.name.toLowerCase().includes(query.toLowerCase())
          })

    const {error, loading, data} = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: selectedPerson?.name
        }
    })

    const numbers = data?.getEventsByEvent.map((o: any) => { return ( o )})    
    numbers?.sort(compareFunction)
    console.log("inc...", numbers);
    
    function compareFunction(a: any,b: any) {
        return a.milliseconds-b.milliseconds
    }

    
    if (loading) return <p>Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  
  return (
    <div className='bg-gray-200 flex-col w-full min-h-screen flex'>
        <div className="mx-auto px-4 h-full w-full">
            <Header />
            <EventDropdown 
                selectedPerson={selectedPerson}
                setSelectedPerson={setSelectedPerson}
                setQuery={setQuery}
                filteredEvents={filteredEvents}
            />
            <div className="mt-8 overflow-x-auto flex flex-col">
                <div className="mx-auto justify-center w-full flex py-2 align-middle ">
                    <div className="overflow-hidden w-[500px] shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className=" divide-y divide-gray-300 w-full">
                            <thead className="bg-gray-50 w-full">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                    Rank
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                    Name
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
                                {numbers?.map((event: any, idx: number) => (
                                    <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                    <td className="whitespace-nowrap w-10 text-center py-1 text-sm text-gray-500">{idx+1}</td>
                                    <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-500">
                                        {event.fullName}
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
        </div>
        <div className="flex gap-2">
            <Link href="/" className=" text-left ">
                <a className="links mt-10 text-center w-full">Create Event</a>
            </Link>
        </div>
    </div>
  )
}

export default event