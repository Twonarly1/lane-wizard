import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { GET_ATHLETES } from "graphql/queries"
import { AthleteDropdown, AthleteEvents } from "components"

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
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
            <AthleteDropdown
                selectedAthlete={selectedAthlete}
                setSelectedAthlete={setSelectedAthlete}
                getAthleteList={getAthleteList?.getAthleteList}
            />
            <AthleteEvents selectedAthlete={selectedAthlete} />
        </div>
    )
}

export default Athlete
