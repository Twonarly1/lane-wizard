import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import { GET_ATHLETES } from "../graphql/queries"
import EventBox from "../components/EventBox"
import AthleteEvents from "../components/AthleteEvents"
import AthleteFound from "../components/AthleteFound"
import Footer from "../components/Footer"

type Athlete = {
    firstName: string
    grade: number
    id: number
    lastName: string
}

const Home = () => {
    const [selectedPerson, setSelectedPerson] = useState()
    const { error, loading, data: athletesData } = useQuery(GET_ATHLETES)

    // Find athlete data from <Athlete Dropdown />
    const athleteFound = athletesData?.getAthleteList.find((athlete: Athlete) => {
        const fullName = athlete.firstName + " " + athlete.lastName
        return fullName === selectedPerson
    })

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <>
            <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
                <div className="flex mt-10 flex-col justify-center md:flex-row-reverse">
                    <div>
                        <AthleteDropdown
                            selectedPerson={selectedPerson}
                            setSelectedPerson={setSelectedPerson}
                            data={athletesData}
                        />
                        <EventBox athleteFound={athleteFound} />
                    </div>
                    <div className="flex-col mt-10 md:mt-0 md:mr-12 md:flex-row">
                        <AthleteFound athleteFound={athleteFound} />
                        <AthleteEvents athleteFound={athleteFound} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
