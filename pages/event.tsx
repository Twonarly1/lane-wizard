import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import EventDropdown from '../components/EventDropdown'
import { GET_EVENTS_BY_EVENT } from '../graphql/queries'
import eventList from "../eventList.json"
import Footer from '../components/Footer'
import EventsFound from '../components/EventsFound'

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
    
    function compareFunction(a: any,b: any) {
        return a.milliseconds-b.milliseconds
    }
   
    if (loading) return <p className='loading'>Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return ( 
    <>
        <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
        <EventDropdown
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setQuery={setQuery}
            filteredEvents={filteredEvents} 
        />
        <EventsFound 
            selectedEvent={selectedEvent} 
            numbers={numbers} />
        </div>
        <Footer />
    </>
  )
}

export default event