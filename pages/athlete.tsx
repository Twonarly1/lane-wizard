import { useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import { GET_ATHLETES, GET_EVENTS } from "../graphql/queries"
import AthleteEvents from "../components/AthleteEvents"
import Footer from "../components/Footer"
import { useSession } from "next-auth/react"

const Athlete = () => {
    const {error: eventsError, loading: eventsLoading, data: events } = useQuery(GET_EVENTS)
    const { error, loading, data: getAthleteList } = useQuery(GET_ATHLETES)
    const { data: session } = useSession()

    const athleteEventList = (athleteId: string) => {
        const athleteEvents = events?.getEventList.filter((event: any) => {
            return event.athlete === athleteId
        })

        return athleteEvents.length != 0 ? true : false
    }

    const getAthleteBestTime = (athleteId: string) => {
        const athleteEvents = events?.getEventList.filter((event: any) => {
            return event.athlete === athleteId
        })
        const athleteBestTime = athleteEvents?.sort((a: any, b: any) => {
            return a.milliseconds - b.milliseconds
        })

        const best = {
            event: athleteBestTime[0].event,
            time: athleteBestTime[0].time,
        }

        return best
    }

    if (loading || eventsLoading) return <p className="loading">Loading ...</p>
    if (error|| eventsError) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 mb-2">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Athletes</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all athletes in the database.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 disabled:bg-opacity-30 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                        disabled={session?.user?.email !== "INSERT ADMIN EMAIL HERE"}
                    >
                        Add Athlete
                    </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Athlete
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Grade
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Best Event
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Role
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {getAthleteList.getAthleteList.map((athlete: any) => (
                                <tr key={athlete.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src="/swim.jpeg" alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{athlete.firstName + " " + athlete.lastName}</div>
                                    </div>
                                    </div>
                                </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">{athlete.grade}</td>
                                {athleteEventList(athlete.id) ? <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">{getAthleteBestTime(athlete.id).event}</div>
                                    <div className="text-gray-500">{getAthleteBestTime(athlete.id).time}</div>
                                </td> : <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    No Events
                                </td>}
                                
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    User
                                    </span>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                    View<span className="sr-only">, {athlete.firstName}</span>
                                    </a>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Athlete
