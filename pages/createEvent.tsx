import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { AthleteDropdown, EventBox, AthleteEvents, Footer, EventDropdown, Admin } from "components"
import { GET_ADMIN_BY_EMAIL, GET_ATHLETES_BY_TEAM } from "graphql/queries"
import { useSession } from "next-auth/react"

const Home = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>("")
    const [selectedPerson, setSelectedPerson] = useState<string>("")
    const { data: session }: any = useSession()
    const [getAdminByEmail, { error: adminError, loading: admingLoading, data: getAdminTeam }] =
        useLazyQuery(GET_ADMIN_BY_EMAIL)
    const [getAthletesByTeam, { error: teamError, loading: teamLoading, data: getAthleteList }] =
        useLazyQuery(GET_ATHLETES_BY_TEAM)

    useEffect(() => {
        if (!session) {
            return
        } else {
            getAdminByEmail({
                variables: {
                    email: session.user.email,
                },
            })
        }
    }, [session])

    useEffect(() => {
        if (!getAdminTeam) {
            return
        } else {
            getAthletesByTeam({
                variables: {
                    team: getAdminTeam?.getAdminByEmail[0].team,
                },
            })
        }
    }, [getAdminTeam])

    // console.log(session?.user)
    // console.log("admin Team", getAdminTeam?.getAdminByEmail[0].team)
    // console.log("admin Athletes", getAthleteList)

    if (admingLoading || teamLoading) return <p className="loading">Loading ...</p>
    if (adminError || teamError)
        return <pre>{JSON.stringify(adminError || teamError, null, 2)}</pre>

    return (
        <>
            <div className="mx-auto w-fit text-left">
                <p className="">
                    {session?.user.name} , {getAdminTeam?.getAdminByEmail[0].team}
                </p>
            </div>
            <div className="mx-auto mt-10 flex min-h-screen w-full max-w-7xl flex-col items-center">
                <AthleteDropdown
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                    getAthleteList={getAthleteList?.getAthleteByTeam}
                />
                <EventDropdown selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
                <EventBox athleteFound={selectedPerson} eventFound={selectedEvent} />
                <Admin selectedPerson={selectedPerson} />
            </div>
            <Footer />
        </>
    )
}

export default Home
