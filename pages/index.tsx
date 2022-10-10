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

// const [checked, setChecked] = useState<any>([])
// const handleCheck = (e: { target: { checked: any; value: string } }) => {
//   const event_id = e.target.value
//   var updatedList = [...checked]
//   const present = updatedList.includes(`${event_id}`,0)
//   if (present) {
//     console.log(present, `id found --> remove event.id ${event_id}`)
//     updatedList.splice(updatedList.indexOf(event_id), 1)
//   } else {
//     console.log(present, `id not found --> add event.id ${event_id}`)
//     updatedList = [...checked, event_id]
//   }
//   setChecked(updatedList)
// }
