import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import EventDropdown from '../components/EventDropdown'
import { GET_EVENTS_BY_EVENT } from '../graphql/queries'
import eventList from "../eventList.json"
import Link from 'next/link'
import Footer from '../components/Footer'

const event = () => {
    const [query, setQuery] = useState('')
    const [selectedEvent, setSelectedEvent] = useState<any>("")

    const filteredEvents: any =
      query === ''
        ? eventList
        : eventList.filter((event) => {
            return event.name.toLowerCase().includes(query.toLowerCase())
          })

    const {error, loading, data} = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: selectedEvent?.name
        }
    })

    const numbers = data?.getEventsByEvent.map((o: any) => { return ( o )})    
    numbers?.sort(compareFunction)
    console.log("inc...", numbers);
    
    function compareFunction(a: any,b: any) {
        return a.milliseconds-b.milliseconds
    }

    
    if (loading) return <p className='loading'>Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  
  return (
    <>
        <div className='bg-gray-200 min-h-screen flex-col mx-auto  flex'>
            <EventDropdown
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              setQuery={setQuery}
              filteredEvents={filteredEvents} />
            {selectedEvent ?
              <div className="mt-8 min-h-screen overflow-x-auto mx-auto md:w-[400px] flex-col">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className=" divide-y divide-gray-300 w-full">
                          <thead className="bg-gray-50 w-full">
                              <tr>
                                  <th scope="col" className="col">
                                      Rank
                                  </th>
                                  <th scope="col" className="col">
                                      Name
                                  </th>
                                  <th scope="col" className="col text-right">
                                      Time
                                  </th>
                              </tr>
                          </thead>
                          <tbody className="bg-white text-xs">
                              {numbers?.map((event: any, idx: number) => (
                                  <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
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
              </div> : <p className="text-gray-500 mt-6 mx-auto font-light">Select athlete for data...</p>
            }
        </div>
      <Footer />
    </>
  )
}

export default event