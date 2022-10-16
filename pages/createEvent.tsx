import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { AthleteDropdown, EventBox, Footer, EventDropdown, Admin } from "components"
import { GET_ADMIN_BY_EMAIL, GET_ATHLETES_BY_TEAM } from "graphql/queries"
import { useSession } from "next-auth/react"

const Home = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>("")
    const [selectedAthlete, setSelectedAthlete] = useState<string>("")
    const { data: session }: any = useSession()
    const [getAdminByEmail, { error: adminError, loading: admingLoading, data: getAdminTeam }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)
    const [getAthletesByTeam, { error: teamError, loading: teamLoading, data: getAthleteList }] =
        useLazyQuery(GET_ATHLETES_BY_TEAM)

    useEffect(() => {
        if (!session) return
        getAdminByEmail({
            variables: {
                email: session.user.email,
            },
        })
    }, [session])

    useEffect(() => {
        if (!getAdminTeam) return
        getAthletesByTeam({
            variables: {
                team: getAdminTeam?.getAdminByEmail[0].team,
            },
        })
    }, [getAdminTeam])

    if (admingLoading || teamLoading) return <p className="loading">Loading ...</p>
    if (adminError || teamError)
        return <pre>{JSON.stringify(adminError || teamError, null, 2)}</pre>

    return (
        <>
            <div className="mx-auto mt-10 w-fit text-left">
                <div className="flex space-x-2">
                    <b className="w-16">Admin:</b>
                    {session?.user.name}
                </div>
                <div className="flex space-x-2">
                    <b className="w-16">Team:</b>
                    {getAdminTeam?.getAdminByEmail[0].team}
                </div>
            </div>
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
                <div className="ml-4">
                    <AthleteDropdown
                        selectedAthlete={selectedAthlete}
                        setSelectedAthlete={setSelectedAthlete}
                        getAthleteList={getAthleteList?.getAthleteByTeam}
                    />
                </div>
                <div className="-mt-8 mr-[1px]">
                    <EventDropdown
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                    />
                </div>
                <EventBox athleteFound={selectedAthlete} eventFound={selectedEvent} />
                <Admin selectedAthlete={selectedAthlete} />
            </div>
            <Footer />
        </>
    )
}

export default Home
