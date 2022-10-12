import React, { useState } from "react"
import { TeamEvents, TeamDropdown, Footer } from "components"

const team: string[] = ["Sartell", "foo", "bar"]

const Team = () => {
    const [teamSelected, setTeamSelected] = useState<string>("")

    return (
        <>
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
                <TeamDropdown
                    selectedTeam={teamSelected}
                    setSelectedTeam={setTeamSelected}
                    getTeamList={team}
                />
                <TeamEvents selectedTeam={teamSelected} />
            </div>
            <Footer />
        </>
    )
}

export default Team
