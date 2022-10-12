import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { GET_ATHLETES } from "graphql/queries"
import { AthleteDropdown, AthleteEvents, Footer } from "components"

const Athlete = () => {
    const [selectedAthlete, setSelectedAthlete] = useState<any>()
    const {
        error: athletesError,
        loading: athletesLoading,
        data: getAthleteList,
    } = useQuery(GET_ATHLETES)

    // if (athletesLoading) return <p className="loading">Loading ...</p>
    if (athletesError) return <pre>{JSON.stringify(athletesError, null, 2)}</pre>

    return (
        <>
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
                <AthleteDropdown
                    selectedAthlete={selectedAthlete}
                    setSelectedAthlete={setSelectedAthlete}
                    getAthleteList={getAthleteList?.getAthleteList}
                />
                <AthleteEvents selectedAthlete={selectedAthlete} />
            </div>
            <Footer />
        </>
    )
}

export default Athlete

{
    /* <div className="mx-auto mb-2   max-w-sm items-center">
                <div className="sm:flex sm:items-center">
                    <div className="text-left md:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Athletes</h1>
                        <p className="mt-2 text-sm">A list of all athletes in the database.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-opacity-30 sm:w-auto"
                            disabled={session?.user?.email !== "INSERT ADMIN EMAIL HERE"}
                        >
                            Add Athlete
                        </button>
                    </div>
                </div> */
}
