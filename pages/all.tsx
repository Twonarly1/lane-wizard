import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { GET_EVENTS } from '../graphql/queries'

const All = () => {
    const {error, loading, data: events } = useQuery(GET_EVENTS)      
    const [checked, setChecked] = useState<any>([])

    // const handleCheck = (e: { target: { checked: any; value: string } }) => {
    //   const event_id = e.target.value
    //   var updatedList = [...checked]
    //   const present = updatedList.includes(`${event_id}`,0)
    //   if (present) {
    //     console.log(present, `id found --> remove event.id ${event_id}`)
    //     updatedList.splice(updatedList.indexOf(event_id), 1)
    //   } else {
    //     console.log(present, `id not found --> add event.id ${event_id}`)
    //     updatedList = [...checked, event_id]
    //   }
    //   setChecked(updatedList)
    // }
  
    if (loading) return <p className='loading'>Loading ...</p>;
    if (error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  return (
    <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
      <div className='mt-10'>
        <div className="overflow-x-auto justify-between flex flex-col">
            <div className="overflow-y-auto">
            <table className=" divide-y divide-gray-300 w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="col">id</th>
                    <th scope="col" className="col">Name</th>
                    <th scope="col" className="col">Events ({events?.getEventList.length})</th>
                    <th scope="col" className="col text-right">Time </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-xs">
                  {events?.getEventList?.map((event: any, idx: number) => (
                    <tr key={idx} className='odd:bg-gray-50 bg-white'>
                    
                      <td className="row">
                        {event.id}
                      </td>
                      <td className="row">
                        {event.fullName}
                      </td>
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
      </div>
      <Footer />
    </div>
  )
}

export default All