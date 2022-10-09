import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import { GET_ATHLETES, GET_EVENTS } from "../graphql/queries"
import AthleteEvents from "../components/AthleteEvents"
import Footer from "../components/Footer"
import { useSession } from "next-auth/react"

const Athlete = () => {
    const [selectedPerson, setSelectedPerson] = useState()
    const {error: eventsError, loading: eventsLoading, data: events } = useQuery(GET_EVENTS)
    const { error, loading, data: getAthleteList } = useQuery(GET_ATHLETES)
    const { data: session } = useSession()

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
                <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
                <AthleteDropdown
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                    getAthleteList={getAthleteList.getAthleteList}
                />
                <AthleteEvents selectedPerson={selectedPerson} />
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Athlete
