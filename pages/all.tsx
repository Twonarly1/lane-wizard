import { useQuery } from '@apollo/client'
import React from 'react'
import Footer from '../components/Footer'
import { GET_EVENTS } from '../graphql/queries'

type Props = {}

const All = (props: Props) => {
    const {error, loading, data: events } = useQuery(GET_EVENTS)      
    console.log(events?.getEventList);

    if (loading) return <p className='loading'>Loading ...</p>;
    if (error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  return (
    <>
      <div className="w-full bg-gray-200 overflow-x-auto  justify-between flex flex-col">
        {events &&
          <p className='text-gray-500 py-4 font-light mx-auto'>
            counting <span className='text-black'>{events?.getEventList.length}</span> events
          </p>}
        <div className="inline-block py-2">
          <div className="overflow-y-auto">
            <table className="w-[300px] md:w-[400px] mx-auto divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="col">
                    Name
                  </th>
                  <th scope="col" className="col">
                    Event
                  </th>
                  <th scope="col" className="col text-right">
                    Time
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white text-xs">
                {events?.getEventList?.map((event: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
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