import { useLazyQuery } from "@apollo/client"
import { TeamDropdown } from "components"
import { CommonColumns, TableHeader } from "components/table"
import { GET_EVENTS_BY_TEAM_AND_EVENT } from "graphql/queries"
import React, { useState } from "react"
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
    date: string
    __typename: string
}

const team: string[] = ["Sartell", "test"]

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

    useEffect(() => {
        if (!teamSelected) return
        const numbers = teamBA?.getEventsByTeamAndEvent
            .map((o: any) => {
                return o
            })
            .sort((a: any, b: any) => a.milliseconds - b.milliseconds)
    }, [teamSelected])

    const calculateMedleySimulationTime = () => {
        const numbers = [BA[1], BR[1], FL[1], FR[1]]
        const sum: number = numbers?.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const min: number = Math.floor(sum / 1000 / 60)
        const sec: any = ((sum / 1000) % 60).toFixed(2)
        let swimTime = ""
        if (sec.length === 4) {
            swimTime = "0" + min + ":0" + sec
        } else {
            swimTime = "0" + min + ":" + sec
        }
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
        <div className="w-full items-center  justify-center text-center ">
            <div className="mx-auto flex w-fit">
                <div className="  mx-auto w-full items-center">
                    <TeamDropdown
                        selectedTeam={teamSelected}
                        setSelectedTeam={setTeamSelected}
                        getTeamList={team}
                    />
                    <div className="mx-auto flex justify-center space-x-2">
                        <button
                            className=" mt-8 rounded bg-white px-4 text-lg shadow ring-1 ring-black ring-opacity-5"
                            onClick={calculateMedleySimulationTime}
                        >
                            calculate
                        </button>
                        <div
                            className={`mt-8 items-center rounded px-4 text-lg shadow ring-1 ring-black ring-opacity-5  ${
                                flash ? "bg-green-100" : "bg-white"
                            } `}
                        >
                            <p> {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`mx-auto mt-10 flex flex-col justify-center gap-y-6 pb-20 md:grid md:max-w-2xl md:grid-cols-2 ${
                    teamSelected ? "visible" : "invisible"
                }`}
            >
                {/* Med. BA */}
                <div
                    className={`  mx-auto w-fit flex-col text-left ${
                        teamBA?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                    } `}
                >
                    <p>Backstroke</p>
                    <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                        <div className="inline-block rounded align-middle">
                            <div className="overflow-hidden ">
                                <table className="px- table">
                                    <TableHeader name={true} grade={true} date={true} time={true} />
                                    <tbody className="tbody">
                                        {teamBA?.getEventsByTeamAndEvent
                                            ?.map((o: any) => {
                                                return o
                                            })
                                            .sort(
                                                (a: any, b: any) => a.milliseconds - b.milliseconds
                                            )
                                            .map((event: Event, idx: number) => (
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
                                                        date={event.date}
                                                    />
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. BR */}
                <div
                    className={`  mx-auto w-fit flex-col text-left ${
                        teamBR?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                    } `}
                >
                    <p>Breaststroke</p>
                    <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden ">
                                <table className="table ">
                                    <TableHeader name={true} grade={true} date={true} time={true} />
                                    <tbody className="tbody">
                                        {teamBR?.getEventsByTeamAndEvent
                                            ?.map((o: any) => {
                                                return o
                                            })
                                            .sort(
                                                (a: any, b: any) => a.milliseconds - b.milliseconds
                                            )
                                            .map((event: Event, idx: number) => (
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
                                                        date={event.date}
                                                    />
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. FL */}
                <div
                    className={`  mx-auto w-fit flex-col text-left ${
                        teamFL?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                    } `}
                >
                    <p>Fly</p>
                    <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden">
                                <table className="table ">
                                    <TableHeader name={true} grade={true} date={true} time={true} />
                                    <tbody className="tbody">
                                        {teamFL?.getEventsByTeamAndEvent
                                            ?.map((o: any) => {
                                                return o
                                            })
                                            .sort(
                                                (a: any, b: any) => a.milliseconds - b.milliseconds
                                            )
                                            .map((event: Event, idx: number) => (
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
                                                        date={event.date}
                                                    />
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Med. FR */}
                <div
                    className={` mx-auto w-fit flex-col text-left ${
                        teamFR?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                    } `}
                >
                    <p>Freestyle</p>
                    <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden">
                                <table className="table ">
                                    <TableHeader name={true} grade={true} date={true} time={true} />
                                    <tbody className="tbody">
                                        {teamFR?.getEventsByTeamAndEvent
                                            ?.map((o: any) => {
                                                return o
                                            })
                                            .sort(
                                                (a: any, b: any) => a.milliseconds - b.milliseconds
                                            )
                                            .map((event: Event, idx: number) => (
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
                                                        date={event.date}
                                                    />
                                                </tr>
                                            ))}
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
