import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { AthleteDropdown, TeamEventBox, EventDropdown, Admin, AdminTeamEvent } from "components"
import { GET_ADMIN_BY_EMAIL, GET_ATHLETES_BY_TEAM } from "graphql/queries"
import { useSession } from "next-auth/react"

const CreateTeamEvent = () => {
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
        <div className="mx-auto flex min-h-screen w-full flex-col items-center">
            <div className="mx-auto mt-10 w-fit text-left">
                <div className="mx-auto flex w-fit items-center space-x-3">
                    <img
                        src={getAdminTeam?.getAdminByEmail[0].image}
                        className="h-10 w-fit object-cover"
                    />
                    <div className="flex flex-col text-left">
                        <p> {session?.user.name}</p>
                        <p>{getAdminTeam?.getAdminByEmail[0].team}</p>
                    </div>
                </div>
                <div className="mx-auto flex flex-col items-center justify-center">
                    <EventDropdown
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                    />
                </div>
                <TeamEventBox
                    eventFound={selectedEvent}
                    adminTeam={getAdminTeam?.getAdminByEmail[0].team}
                />
                <AdminTeamEvent
                    teamFound={getAdminTeam?.getAdminByEmail[0].team}
                    selectedEvent={selectedEvent}
                />
            </div>
        </div>
    )
}

export default CreateTeamEvent
