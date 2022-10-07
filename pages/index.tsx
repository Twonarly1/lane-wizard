import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import { GET_ATHLETES, GET_EVENT_USING_ATHLETE } from "../graphql/queries"
import EventBox from "../components/EventBox"
import AthleteEvents from "../components/AthleteEvents"
import AthleteFound from "../components/AthleteFound"
import Footer from "../components/Footer"

const Home = () => {
    const [query, setQuery] = useState<string>("")
    const [selectedPerson, setSelectedPerson] = useState()
    const { loading, error, data } = useQuery(GET_ATHLETES)

    // Find athlete data from <Athlete Dropdown />
    const athleteFound = data?.getAthleteList.find((athlete: any, i: number) => {
        const fullName = athlete.firstName + " " + athlete.lastName
        return fullName === selectedPerson
    })

    // Query events using athlete
    const { data: eData } = useQuery(GET_EVENT_USING_ATHLETE, {
        variables: {
            id: athleteFound?.id.toString(),
        },
    })

    // Filter athletes
    const filteredAthletes =
        query === ""
            ? data?.getAthleteList
            : data?.getAthleteList.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <>
            <div className="flex mx-auto min-h-screen max-w-7xl w-full flex-col items-center">
                <div className="grid mt-10 grid-cols-1 md:space-x-16 justify-center md:grid-cols-2">
                    <div className="hidden md:flex flex-col">
                        <AthleteFound athleteFound={athleteFound} />

                        <AthleteEvents
                            athlete={eData?.getEventUsingAthlete}
                            loading={loading}
                            error={error}
                        />
                    </div>
                    <div className="">
                        <AthleteDropdown
                            selectedPerson={selectedPerson}
                            setSelectedPerson={setSelectedPerson}
                            setQuery={setQuery}
                            filteredAthletes={filteredAthletes}
                        />
                        <EventBox
                            athleteFound={athleteFound}
                            setSelectedPerson={setSelectedPerson}
                        />
                    </div>
                    <div className="flex-col mt-10 md:hidden">
                        <AthleteFound athleteFound={athleteFound} />

                        <AthleteEvents
                            athlete={eData?.getEventUsingAthlete}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
