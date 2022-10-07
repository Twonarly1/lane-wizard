import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { DELETE_EVENT } from '../graphql/mutations'
import { GET_EVENTS } from '../graphql/queries'

type Props = {}

const All = (props: Props) => {
    const {error, loading, data: events } = useQuery(GET_EVENTS)      
    const [idToDelete, setIdToDelete] = useState<string>("")
    const [deleteEvent] = useMutation(DELETE_EVENT)
    const [checked, setChecked] = useState<any>([])

      const handleOnSubmit = () => {
        const eventToDelete = deleteEvent({
          variables: {
              id: idToDelete.toString(),
          },
        })
        setIdToDelete("")
      console.log("event deleted:", eventToDelete)
      }

      // console.log(events);
      
     
  
  // Add/Remove checked item from list
  const handleCheck = (e: { target: { checked: any; value: string } }) => {
    const event_id = e.target.value
    var updatedList = [...checked]
    const present = updatedList.includes(`${event_id}`,0)
    if (present) {
      console.log(present, `id found --> remove event.id ${event_id}`)
      updatedList.splice(updatedList.indexOf(event_id), 1)
    } else {
      console.log(present, `id not found --> add event.id ${event_id}`)
      updatedList = [...checked, event_id]
    }
    setChecked(updatedList)
  }

  console.log("Working!...",checked);

  // const handleCheckBox = (e: any) => {
  //   let id = e.target.value
  //   events.getEventList.find((event: any) => {
  //     return console.log(event.id === id)
  //   })
  // }

    if (loading) return <p className='loading'>Loading ...</p>;
    if (error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  return (
    <>
      <div className="w-full bg-gray-200 overflow-x-auto justify-between flex flex-col">
        <div className="inline-block py-2">
          <div className="overflow-y-auto">
            <table className="w-[300px] md:w-[400px] mx-auto divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th scope="col" className="col pl-2 pr-0">
                  <button onSubmit={handleOnSubmit} className=''>
                  delete
                  </button>
                  </th> */}
                  <th scope="col" className="col">
                    id
                  </th>
                  <th scope="col" className="col">
                    Name
                  </th>
                  <th scope="col" className="col">
                    Events ({events?.getEventList.length})
                  </th>
                  <th scope="col" className="col text-right">
                    Time 
                  </th>
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
    </>
  )
}

export default All