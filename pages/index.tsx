import React, { useState } from "react"
import { TeamEvents, TeamDropdown, Footer } from "components"
import { useLazyQuery } from "@apollo/client"
import { GET_EVENTS_BY_TEAM } from "graphql/queries"
import { useEffect } from "react"

const team: string[] = ["Sartell", "foo", "bar"]

const Team = () => {
    const [teamSelected, setTeamSelected] = useState<any>()
    const [getEventsByTeamMax, { error, loading, data: maxEvents }] =
        useLazyQuery(GET_EVENTS_BY_TEAM)

    useEffect(() => {
        if (!teamSelected) return
        getEventsByTeamMax({
            variables: {
                team: teamSelected,
            },
        })
    }, [teamSelected])

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre className="w-40">{JSON.stringify(error, null, 2)}</pre>

    return (
        <>
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
                <TeamDropdown
                    selectedTeam={teamSelected}
                    setSelectedTeam={setTeamSelected}
                    getTeamList={team}
                />
                <TeamEvents selectedTeam={teamSelected} max={maxEvents?.getEventByTeam?.length} />
            </div>
            <Footer />
        </>
    )
}

export default Team
