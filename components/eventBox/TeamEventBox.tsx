import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_TEAM_EVENT } from "graphql/mutations"
import { GET_EVENTS_BY_TEAM_AND_EVENT } from "graphql/queries"
import { millisecondsToMinutes } from "lib/utils"
import { CommonColumns, TableHeader } from "components/table"

type Props = {
    eventFound: any
    adminTeam: string
}

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
    grade: number
}

type Event = {
    athlete: string
    event: string
    fullName: string
    grade: number
    id: string
    milliseconds: any
    team: string
    time: string
    date: string
    __typename: string
}

const TeamEventBox = ({ eventFound, adminTeam }: Props) => {
    const [time, setTime] = useState<any>("")
    const [addTeamEvent] = useMutation(ADD_TEAM_EVENT) // add event mutation
    const [getEventsByEvent, { data: event }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [backstroke, { data: teamBA }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [breaststroke, { data: teamBR }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [fly, { data: teamFL }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [free, { data: teamFR }] = useLazyQuery(GET_EVENTS_BY_TEAM_AND_EVENT)
    const [active, setActive] = useState<boolean>(false)
    const current = new Date()
    const date = `${
        current.getFullYear() + "-" + (current.getMonth() + 1 + "-" + current.getDate())
    }`
    const [checked, setChecked] = useState<any>([])
    const [ms, setMs] = useState<number>(0)
    const [BA, setBA] = React.useState<any[]>(["", 0])
    const [BR, setBR] = React.useState<any[]>(["", 0])
    const [FL, setFL] = React.useState<any[]>(["", 0])
    const [FR, setFR] = React.useState<any[]>(["", 0])
    const isBackSelected = (value: string): boolean => BA[0] === value
    const isBreastSelected = (value: string): boolean => BR[0] === value
    const isFlySelected = (value: string): boolean => FL[0] === value
    const isFreeSelected = (value: string): boolean => FR[0] === value
    const [medley, setMedley] = useState<boolean>(false)

    useEffect(() => {
        setChecked([])
        if (eventFound === "Team Medley") {
            setMedley(true)
            backstroke({
                variables: {
                    team: adminTeam,
                    event: "Med. BA",
                },
            })
            breaststroke({
                variables: {
                    team: adminTeam,
                    event: "Med. BR",
                },
            })
            fly({
                variables: {
                    team: adminTeam,
                    event: "Med. FL",
                },
            })
            free({
                variables: {
                    team: adminTeam,
                    event: "Med. FR",
                },
            })
        } else if (eventFound === "Team 200 FR") {
            setMedley(false)
            getEventsByEvent({
                variables: {
                    team: adminTeam,
                    event: "200 FR",
                },
            })
        } else {
            if (eventFound === "Team 400 FR") {
                setMedley(false)
                getEventsByEvent({
                    variables: {
                        team: adminTeam,
                        event: "400 FR",
                    },
                })
            }
        }
    }, [eventFound])

    //////  REACT HOOK FORM  ////////
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()

    const handleCheck = (e: { target: { checked: any; value: string } }, params: any) => {
        const event_id = e.target.value
        // const event_milliseconds = params.event.milliseconds
        var updatedList = [...checked]
        const present = updatedList.find((event: any) => {
            return event.event_id == event_id
        })
        if (present) {
            // console.log(present, `id found --> remove event.id ${event_id}`)
            updatedList.splice(updatedList.indexOf(event_id), 1)
        } else {
            // console.log(present, `id not found --> add event.id ${event_id}`)
            if (checked.length !== 4) {
                updatedList = [...checked, { params }]
            } else {
                e.target.checked = false
            }
        }
        setChecked(updatedList)
    }

    useEffect(() => {
        if (checked.length != 4) return
        const numbers = checked.map((ms: any, idx: number) => ms.params.event.milliseconds)
        setMs((numbers[0] + numbers[1] + numbers[2] + numbers[3]) * 10)
    }, [checked])

    useEffect(() => {
        if (!BA && !BR && !FL && !FR) return
        setMs((BA[1] + BR[1] + FL[1] + FR[1]) * 10)
    }, [BA, BR, FL, FR])

    const onSubmit = handleSubmit(async (formData: IFormInput) => {
        const notification = toast.loading("Creating new event")

        // throw error if input length less than 2
        if (checked.length < 4 && !BA && !BR && !FL && !FR) {
            return toast.error("need four athlete events", {
                id: notification,
            })
        }

        try {
            console.log("Creating event...", formData)
            if (eventFound != "Team Medley") {
                const {
                    data: { insertEvent: newEvent },
                } = await addTeamEvent({
                    variables: {
                        event_id_1: checked[0].params.event.id,
                        event_id_2: checked[1].params.event.id,
                        event_id_3: checked[2].params.event.id,
                        event_id_4: checked[3].params.event.id,
                        team: adminTeam.toString(),
                        date: date,
                        event: eventFound,
                        milliseconds: ms,
                        time: millisecondsToMinutes(ms / 10),
                    },
                })
                console.log("New event added:", newEvent)
            }

            if ((eventFound = "Team Medley")) {
                const {
                    data: { insertEvent: newEvent },
                } = await addTeamEvent({
                    variables: {
                        event_id_1: BA[0],
                        event_id_2: BR[0],
                        event_id_3: FL[0],
                        event_id_4: FR[0],
                        team: adminTeam.toString(),
                        date: date,
                        event: eventFound,
                        milliseconds: ms,
                        time: millisecondsToMinutes(ms / 10),
                    },
                })
                console.log("New event added:", newEvent)
            }

            setValue("athlete", "")
            setValue("event", "")
            setValue("time", "")
            setValue("milliseconds", "")
            setValue("fullName", "")

            toast.success("New Team Event Created!", {
                id: notification,
            })
        } catch (error) {
            //alert error
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
        }
    })
    ////  REACT HOOK FORM  ////////

    return (
        eventFound && (
            <div>
                {!medley && (
                    <div className="mt-10 flex flex-col">
                        <div className="overflow-hidden rounded shadow ring-1 ring-black ring-opacity-5">
                            <table className="table">
                                <TableHeader name={true} grade={true} date={true} time={true} />
                                <tbody className="tbody">
                                    {event?.getEventsByTeamAndEvent?.map(
                                        (event: any, idx: number) => (
                                            <tr key={idx} className="tr">
                                                <td className="flex items-center">
                                                    <input
                                                        className="radio mr-2 ml-2 cursor-pointer"
                                                        type="checkbox"
                                                        value={event.id}
                                                        onChange={(e: any) =>
                                                            handleCheck(e, { event })
                                                        }
                                                        // checked={}
                                                    />
                                                    <p className="items-center">
                                                        {" "}
                                                        {event.fullName}
                                                    </p>
                                                </td>

                                                <CommonColumns
                                                    grade={event.grade}
                                                    time={event.time}
                                                    date={event.date}
                                                />
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* Med. BA */}
                {eventFound === "Team Medley" && (
                    <div
                        className={` mx-auto mt-10 w-fit flex-col text-left ${
                            teamBA?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                        } `}
                    >
                        <p>Backstroke</p>
                        <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                            <div className="inline-block rounded align-middle">
                                <div className="overflow-hidden ">
                                    <table className="px- table">
                                        <TableHeader
                                            name={true}
                                            grade={true}
                                            date={true}
                                            time={true}
                                        />
                                        <tbody className="tbody">
                                            {teamBA?.getEventsByTeamAndEvent
                                                ?.map((o: any) => {
                                                    return o
                                                })
                                                .sort(
                                                    (a: any, b: any) =>
                                                        a.milliseconds - b.milliseconds
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
                                                                    checked={isBackSelected(
                                                                        event.id
                                                                    )}
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
                )}
                {/* Med. BR */}
                {eventFound === "Team Medley" && (
                    <div
                        className={`mx-auto mt-6 w-fit flex-col text-left ${
                            teamBR?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                        } `}
                    >
                        <p>Breaststroke</p>
                        <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                            <div className="inline-block rounded align-middle">
                                <div className="overflow-hidden ">
                                    <table className="px- table">
                                        <TableHeader
                                            name={true}
                                            grade={true}
                                            date={true}
                                            time={true}
                                        />
                                        <tbody className="tbody">
                                            {teamBR?.getEventsByTeamAndEvent
                                                ?.map((o: any) => {
                                                    return o
                                                })
                                                .sort(
                                                    (a: any, b: any) =>
                                                        a.milliseconds - b.milliseconds
                                                )
                                                .map((event: Event, idx: number) => (
                                                    <tr key={idx} className="tr">
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
                                                                    checked={isBreastSelected(
                                                                        event.id
                                                                    )}
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
                )}
                {/* Med. FL */}
                {eventFound === "Team Medley" && (
                    <div
                        className={`mx-auto mt-6 w-fit flex-col text-left ${
                            teamFL?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                        } `}
                    >
                        <p>Fly</p>
                        <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                            <div className="inline-block rounded align-middle">
                                <div className="overflow-hidden ">
                                    <table className="px- table">
                                        <TableHeader
                                            name={true}
                                            grade={true}
                                            date={true}
                                            time={true}
                                        />
                                        <tbody className="tbody">
                                            {teamFL?.getEventsByTeamAndEvent
                                                ?.map((o: any) => {
                                                    return o
                                                })
                                                .sort(
                                                    (a: any, b: any) =>
                                                        a.milliseconds - b.milliseconds
                                                )
                                                .map((event: Event, idx: number) => (
                                                    <tr key={idx} className="tr">
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
                                                                    checked={isFlySelected(
                                                                        event.id
                                                                    )}
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
                )}
                {/* Med. BA */}
                {eventFound === "Team Medley" && (
                    <div
                        className={`mx-auto mt-6 w-fit flex-col text-left ${
                            teamFR?.getEventsByTeamAndEvent.length > 0 ? "visible" : "invisible"
                        } `}
                    >
                        <p>Free</p>
                        <div className="mx-auto flex h-fit max-h-40 w-fit flex-col overflow-y-auto rounded-l text-center shadow ring-1 ring-black ring-opacity-5 md:h-fit md:max-h-80">
                            <div className="inline-block rounded align-middle">
                                <div className="overflow-hidden ">
                                    <table className="px- table">
                                        <TableHeader
                                            name={true}
                                            grade={true}
                                            date={true}
                                            time={true}
                                        />
                                        <tbody className="tbody">
                                            {teamFR?.getEventsByTeamAndEvent
                                                ?.map((o: any) => {
                                                    return o
                                                })
                                                .sort(
                                                    (a: any, b: any) =>
                                                        a.milliseconds - b.milliseconds
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
                                                                    checked={isFreeSelected(
                                                                        event.id
                                                                    )}
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
                )}

                <form
                    onSubmit={onSubmit}
                    className="relative mt-10 flex flex-col justify-between overflow-x-auto"
                >
                    {/* display formatted swimTime or diveScore */}

                    {eventFound && (
                        <div className=" mx-1 mb-1 flex justify-center rounded bg-white shadow ring-1 ring-black ring-opacity-5 hover:text-blue-500">
                            <button className="w-full rounded py-2" type="submit">
                                <p>Create Event</p>
                            </button>
                        </div>
                    )}
                </form>
            </div>
        )
    )
}

export default TeamEventBox
