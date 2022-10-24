import React, { useEffect, useState } from "react"
import { EventDropdown, EventsFound, TeamDropdown, TeamEvents } from "components"
import { useLazyQuery } from "@apollo/client"
import { GET_EVENTS_BY_TEAM } from "graphql/queries"

const team: string[] = ["Sartell", "test"]

const event = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>()
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
        <div className="mx-auto mb-10 flex min-h-screen w-full max-w-7xl flex-col items-center">
            <TeamDropdown
                selectedTeam={teamSelected}
                setSelectedTeam={setTeamSelected}
                getTeamList={team}
            />
            <div className="-mt-6">
                <EventDropdown selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
                <button
                    className={`mx-2 text-xs ${selectedEvent ? "visible" : "invisible"}`}
                    onClick={() => setSelectedEvent("")}
                >
                    view all team records.
                </button>
            </div>
            {selectedEvent ? (
                <EventsFound selectedTeam={teamSelected} selectedEvent={selectedEvent} />
            ) : (
                <TeamEvents selectedTeam={teamSelected} max={maxEvents?.getEventByTeam?.length} />
            )}
        </div>
    )
}

export default event
