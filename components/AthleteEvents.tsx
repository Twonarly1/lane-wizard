import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { DELETE_EVENT } from '../graphql/mutations'
import { GET_EVENT_BY_ATHLETE } from '../graphql/queries'

type Props = {
    selectedPerson: any
}

const AthleteEvents = ({ selectedPerson}: Props) => {
    const [events, setEvents]= useState<boolean>(false)
    const [deleteEvent] = useMutation(DELETE_EVENT)
    const [getEventsByAthlete, { data: athletesEvents, refetch }] =
    useLazyQuery(GET_EVENT_BY_ATHLETE)
    const [selectedRadioBtn, setSelectedRadioBtn] = React.useState<any>()
    const isRadioSelected = (value: string): boolean => selectedRadioBtn === value
    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => setSelectedRadioBtn(e.currentTarget.value)
    
    useEffect(() => {
        if (!selectedPerson) {
            return
        } else {
            getEventsByAthlete({
                variables: {
                    fullName: selectedPerson,
                },
            })
            setEvents(true)
        }
    }, [selectedPerson])

    const handleOnSubmit = (e: any, params: any) => {
        console.log(params.event.id);
       const id = params.event.id
        const eventToDelete = deleteEvent({
            variables: {
                id: id.toString(),
            },
        })
        refetch()
      console.log("event deleted:", eventToDelete)
      }

  return (
    selectedPerson && 
        <div className="mt-10">
            <div className="overflow-x-auto justify-between flex flex-col">
                <div className="overflow-hidden ">
                    <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="col pl-2"></th>
                                <th scope="col" className="col">#</th>
                                <th scope="col" className="col">Event</th>
                                <th scope="col" className="col pr-0">Time</th>
                                <th scope="col" className="col text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-xs">
                            {athletesEvents?.getEventByAthlete?.map((event: any, idx: number) => (
                                <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                    <td className="row w-4 pl-2 pr-0">
                                        <input
                                            className="bg-white w-3 h-3 checked:text-blue-400  focus:outline-none border-gray-300 focus:ring-transparent"
                                            type="radio"
                                            value={event.id}
                                            checked={isRadioSelected(event.id)}
                                            onChange={handleRadioClick} />
                                    </td>
                                    <td className="row">{idx}</td>
                                    <td className="row">{event.event}</td>
                                    <td className="row pr-0">{event.time}</td>
                                    <td className="row text-right pr-1">
                                        <svg
                                            onClick={(e: any) => handleOnSubmit(e, { event })}
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`cursor-pointer transition-all duration-500 ease-in-out w-4 h-4 ${selectedRadioBtn === event.id ? "text-gray-400" : "text-gray-200"}`}>
                                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                        </svg>
                                    </td>
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

