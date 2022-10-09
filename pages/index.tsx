import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import { GET_ATHLETES } from "../graphql/queries"
import EventBox from "../components/EventBox"
import AthleteEvents from "../components/AthleteEvents"
import Footer from "../components/Footer"

const Home = () => {
    const [selectedPerson, setSelectedPerson] = useState()
    const { error, loading, data: getAthleteList } = useQuery(GET_ATHLETES)
    console.log(selectedPerson)

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <>
            <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
                <AthleteDropdown
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                    getAthleteList={getAthleteList.getAthleteList}
                />
                <EventBox athleteFound={selectedPerson} />
                <AthleteEvents selectedPerson={selectedPerson} />
            </div>
            <Footer />
        </>
    )
}

export default Home
