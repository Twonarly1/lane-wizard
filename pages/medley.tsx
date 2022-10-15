import { useLazyQuery } from "@apollo/client"
import { TeamDropdown } from "components"
import { CommonColumns, TableHeader } from "components/medley"
import { GET_EVENTS_BY_TEAM_AND_EVENT } from "graphql/queries"
import React, { LegacyRef, useRef, useState } from "react"
import { useEffect } from "react"

type Props = {
    isOpen: any
    setIsOpen: any
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: number
    team: string
    time: any
    __typename: string
}

const team: string[] = ["Sartell", "foo", "bar"]

const DialogDemo = ({}: Props) => {
    const [teamSelected, setTeamSelected] = useState<any>()
    const [backstroke, { data: teamBA }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [breaststroke, { data: teamBR }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [fly, { data: teamFL }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [free, { data: teamFR }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [BA, setBA] = React.useState<any[]>(["", 0])
    const [BR, setBR] = React.useState<any[]>(["", 0])
    const [FL, setFL] = React.useState<any[]>(["", 0])
    const [FR, setFR] = React.useState<any[]>(["", 0])
    const isBackSelected = (value: string): boolean => BA[0] === value
    const isBreastSelected = (value: string): boolean => BR[0] === value
    const isFlySelected = (value: string): boolean => FL[0] === value
    const isFreeSelected = (value: string): boolean => FR[0] === value
    const [simulatedRelayTime, setSimulatedRelayTime] = useState<string | null>(null)
    const [flash, setFlash] = useState<boolean>(false)

    const calculateMedleySimulationTime = () => {
        const numbers = [BA[1], BR[1], FL[1], FR[1]]
        console.log(numbers)
        const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const min: number = Math.floor(sum / 1000 / 60)
        const sec: any = ((sum / 1000) % 60).toFixed(2)
        const swimTime = "0" + min + ":" + sec
        setSimulatedRelayTime(swimTime)
        setFlash(true)
        setTimeout(() => {
            setFlash(false)
        }, 600)
    }

    useEffect(() => {
        if (!teamSelected) return
        backstroke({
            variables: {
                team: teamSelected,
                event: "Med. BA",
            },
        })
        breaststroke({
            variables: {
                team: teamSelected,
                event: "Med. BR",
            },
        })
        fly({
            variables: {
                team: teamSelected,
                event: "Med. FL",
            },
        })
        free({
            variables: {
                team: teamSelected,
                event: "Med. FR",
            },
        })
    }, [teamSelected])

    return (
        <div className="w-full items-center justify-center px-4  text-center ">
            <div className="mx-auto flex w-fit">
                <div className=" ml-4  w-full items-center space-x-2 md:ml-0 md:justify-center">
                    <TeamDropdown
                        selectedTeam={teamSelected}
                        setSelectedTeam={setTeamSelected}
                        getTeamList={team}
                    />
                    <div className="flex space-x-2">
                        <button
                            className=" mt-8 bg-white px-4 text-lg"
                            onClick={calculateMedleySimulationTime}
                        >
                            calculate
                        </button>
                        <div
                            className={`mt-8 items-center px-4 text-lg  ${
                                flash ? "bg-green-100" : "bg-white"
                            } `}
                        >
                            <p> {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={` mx-auto mt-10 flex flex-col justify-center gap-y-6 pb-20 md:grid md:max-w-2xl md:grid-cols-2 md:gap-6 ${
                    teamSelected ? "visible" : "invisible"
                }`}
            >
                {/* Med. BA */}
                <div className=" w-fit flex-col text-left">
                    <p className="mr-2 uppercase tracking-tighter">Back</p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="px- table">
                                    <TableHeader />
                                    <tbody className="tbody">
                                        {teamBA?.getEventsByTeamAndEvent?.map(
                                            (event: Event, idx: number) => (
                                                <tr key={idx} className="tr">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                setBA([
                                                                    event.id,
                                                                    event.milliseconds,
                                                                ])
                                                            }
                                                        >
                                                            <input
                                                                className="radio mr-2 ml-2"
                                                                type="checkbox"
                                                                readOnly={true}
                                                                checked={isBackSelected(event.id)}
                                                            />
                                                            {event.fullName}
                                                        </button>
                                                    </td>
                                                    <CommonColumns
                                                        grade={event.grade}
                                                        time={event.time}
                                                    />
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. BR */}
                <div className=" w-fit flex-col text-left">
                    <p className="mr-2 uppercase tracking-tighter">Breast</p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <TableHeader />
                                    <tbody className="tbody">
                                        {teamBR?.getEventsByTeamAndEvent?.map(
                                            (event: Event, idx: number) => (
                                                <tr key={idx} className="tr ">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                setBR([
                                                                    event.id,
                                                                    event.milliseconds,
                                                                ])
                                                            }
                                                        >
                                                            <input
                                                                className="radio mr-2 ml-2"
                                                                type="checkbox"
                                                                readOnly={true}
                                                                checked={isBreastSelected(event.id)}
                                                            />
                                                            {event.fullName}
                                                        </button>
                                                    </td>
                                                    <CommonColumns
                                                        grade={event.grade}
                                                        time={event.time}
                                                    />
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. FL */}
                <div className=" w-fit flex-col text-left">
                    <p className="mr-2 uppercase tracking-tighter">Fly</p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <TableHeader />
                                    <tbody className="tbody">
                                        {teamFL?.getEventsByTeamAndEvent?.map(
                                            (event: Event, idx: number) => (
                                                <tr key={idx} className="tr ">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                setFL([
                                                                    event.id,
                                                                    event.milliseconds,
                                                                ])
                                                            }
                                                        >
                                                            <input
                                                                className="radio mr-2 ml-2"
                                                                type="checkbox"
                                                                readOnly={true}
                                                                checked={isFlySelected(event.id)}
                                                            />
                                                            {event.fullName}
                                                        </button>
                                                    </td>
                                                    <CommonColumns
                                                        grade={event.grade}
                                                        time={event.time}
                                                    />
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. FR */}
                <div className=" w-fit flex-col text-left">
                    <p className="mr-2 uppercase tracking-tighter">FREE</p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <TableHeader />
                                    <tbody className="tbody">
                                        {teamFR?.getEventsByTeamAndEvent?.map(
                                            (event: Event, idx: number) => (
                                                <tr key={idx} className="tr">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                setFR([
                                                                    event.id,
                                                                    event.milliseconds,
                                                                ])
                                                            }
                                                        >
                                                            <input
                                                                className="radio mr-2 ml-2"
                                                                type="checkbox"
                                                                readOnly={true}
                                                                checked={isFreeSelected(event.id)}
                                                            />
                                                            {event.fullName}
                                                        </button>
                                                    </td>
                                                    <CommonColumns
                                                        grade={event.grade}
                                                        time={event.time}
                                                    />
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogDemo
