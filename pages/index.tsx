import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import AthleteDropdown from "../components/AthleteDropdown"
import Header from "../components/Header"
import { GET_ATHLETES, GET_EVENT_USING_ATHLETE } from "../graphql/queries"
import EventBox from "../components/EventBox"
import AthleteEvents from "../components/AthleteEvents"

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
}

const Home = () => {
    const [query, setQuery] = useState<string>("")
    const [selectedPerson, setSelectedPerson] = useState()
    const { loading, error, data } = useQuery(GET_ATHLETES)

    // Find athlete data from Athlete Dropdown selection
    const athleteFound = data?.getAthleteList.find((athlete: any, i: number) => {
        const fullName = athlete.firstName + " " + athlete.lastName
        return fullName === selectedPerson
    })
    const { data: eData } = useQuery(GET_EVENT_USING_ATHLETE, {
        variables: {
            id: athleteFound?.id.toString(),
        },
    })
    console.log(eData)

    const filteredAthletes =
        query === ""
            ? data?.getAthleteList
            : data?.getAthleteList.filter((athlete: { firstName: string; lastName: string }) => {
                  return athlete.firstName.toLowerCase().includes(query.toLowerCase())
              })

    console.log(selectedPerson)

    if (loading) return <p>Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <div className="flex min-h-screen w-full px-4 flex-col items-center  bg-gray-200 ">
            <div className="mx-auto h-full max-w-7xl">
                <Header />
                <div className="grid grid-cols-1 px-4 md:space-x-8 justify-center md:grid-cols-2 mt-10">
                    <div className=" hidden md:flex flex-col mt-2 ">
                        {athleteFound ? (
                            <div className="flex space-x-2 text-blue-500">
                                <p className="">
                                    {athleteFound?.firstName + " " + athleteFound?.lastName + ","}
                                </p>
                                <p className="">{athleteFound?.grade}</p>
                            </div>
                        ) : (
                            <p className="text-gray-400 font-light">Select athlete</p>
                        )}
                        <div className="hidden md:flex">
                            <AthleteEvents
                                athlete={eData?.getEventUsingAthlete}
                                loading={loading}
                                error={error}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col rounded-lg 0">
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
                </div>
                <div className="mt-10 flex-col md:hidden">
                    {athleteFound ? (
                        <div className="flex space-x-2 text-blue-500">
                            <p className="">
                                {athleteFound?.firstName + " " + athleteFound?.lastName + ","}
                            </p>
                            <p className="">{athleteFound?.grade}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400 font-light">Select athlete</p>
                    )}
                    <div className="flex">
                        <AthleteEvents
                            athlete={eData?.getEventUsingAthlete}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
