import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect } from "react"
import { DELETE_EVENT, DELETE_TEAM_EVENT } from "graphql/mutations"
import { GET_EVENTS, GET_TEAMEVENTS_BY_TEAM_AND_EVENT } from "graphql/queries"
import { CommonColumns, TableHeader } from "components/table"

type Props = {
    selectedEvent: any
    teamFound: any
}

const Admin = ({ selectedEvent, teamFound }: Props) => {
    const [deleteEvent] = useMutation(DELETE_EVENT)
    const [deleteTeamEvent] = useMutation(DELETE_TEAM_EVENT)
    const [getTeamEventsByTeamAndEvent, { loading, error, data: teamEvents, refetch }] =
        useLazyQuery(GET_TEAMEVENTS_BY_TEAM_AND_EVENT)
    const [selectedRadioBtn, setSelectedRadioBtn] = React.useState<any>()
    const isRadioSelected = (value: string): boolean => selectedRadioBtn === value
    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setSelectedRadioBtn(e.currentTarget.value)

    useEffect(() => {
        if (!selectedEvent) {
            return
        } else {
            getTeamEventsByTeamAndEvent({
                variables: {
                    event: selectedEvent,
                    team: teamFound,
                },
            })
        }
    }, [selectedEvent])

    const handleOnSubmit = (e: any, params: any) => {
        const id = params.event.id
        const eventToDelete = deleteTeamEvent({
            variables: {
                id: id.toString(),
            },
        })
        refetch()
        console.log("event deleted:", eventToDelete)
    }

    // const getAthletesIndividualLeg = (params: any) => {
    //     if (!teamEvents) return
    //     console.log("PARAMS", params)
    //     getAthleteLeg({
    //         variables: {
    //             id: params.ath1,
    //         },
    //     })
    // }
    // useEffect(() => {
    //     if (!athleteLeg) return
    //     console.log(athleteLeg)
    // }, [athleteLeg])

    useEffect(() => {
        if (!teamEvents) return
        let time = teamEvents
        // console.log("hererrererere", time)
    }, [teamEvents])

    if (loading) return <p className="loading">Loading ...</p>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        selectedEvent && (
            <div className="mt-10">
                <div className="">
                    {teamEvents?.getTeamEventsByTeamAndEvent.length != 0 && (
                        <p>
                            {teamEvents?.getTeamEventsByTeamAndEvent[0]?.event}
                            <span className="ml-1">
                                ,{teamEvents?.getTeamEventsByTeamAndEvent[0]?.team}
                            </span>
                        </p>
                    )}
                    {teamEvents?.getTeamEventsByTeamAndEvent.length != 0 && (
                        <div className="mx-auto mt-2 flex flex-col">
                            <div className="-my-2 overflow-x-auto">
                                <div className="mx-auto inline-block w-full py-2 align-middle">
                                    <div className="overflow-hidden rounded shadow ring-1 ring-black ring-opacity-5">
                                        <table className="table">
                                            <TableHeader
                                                id={true}
                                                event={true}
                                                name={true}
                                                grade={true}
                                                date={true}
                                                time={true}
                                                total={true}
                                            />
                                            {teamEvents?.getTeamEventsByTeamAndEvent?.map(
                                                (event: any, idx: number) => (
                                                    <tbody key={idx} className="tbody">
                                                        <tr className="tr">
                                                            <CommonColumns
                                                                id={idx + 1}
                                                                event={event.ath1.event}
                                                                name={event.ath1.fullName}
                                                                grade={event.ath1.grade}
                                                                date={event.ath1.date}
                                                                time={event.ath1.time}
                                                                ms={event.ath1.milliseconds}
                                                                last={false}
                                                            />
                                                        </tr>
                                                        <tr className="tr">
                                                            <CommonColumns
                                                                id={idx + 1}
                                                                event={event.ath2.event}
                                                                name={event.ath2.fullName}
                                                                grade={event.ath2.grade}
                                                                date={event.ath2.date}
                                                                time={event.ath2.time}
                                                                ms={
                                                                    event.ath1.milliseconds +
                                                                    event.ath2.milliseconds
                                                                }
                                                                last={false}
                                                            />
                                                        </tr>
                                                        <tr className="tr">
                                                            <CommonColumns
                                                                id={idx + 1}
                                                                event={event.ath3.event}
                                                                name={event.ath3.fullName}
                                                                grade={event.ath3.grade}
                                                                date={event.ath3.date}
                                                                time={event.ath3.time}
                                                                ms={
                                                                    event.ath1.milliseconds +
                                                                    event.ath2.milliseconds +
                                                                    event.ath3.milliseconds
                                                                }
                                                                last={false}
                                                            />
                                                        </tr>
                                                        <tr className="tr ">
                                                            <CommonColumns
                                                                id={idx + 1}
                                                                event={event.ath4.event}
                                                                name={event.ath4.fullName}
                                                                grade={event.ath4.grade}
                                                                date={event.ath4.date}
                                                                time={event.ath4.time}
                                                                ms={
                                                                    event.ath1.milliseconds +
                                                                    event.ath2.milliseconds +
                                                                    event.ath3.milliseconds +
                                                                    event.ath4.milliseconds
                                                                }
                                                                last={true}
                                                            />
                                                        </tr>
                                                        {/* <tr key={idx} className="tr">
                                                        <td className="row it w-4 bg-gray-50 pl-3 pr-0">
                                                            <input
                                                                className="radio rounded-none"
                                                                type="radio"
                                                                value={event.id}
                                                                checked={isRadioSelected(event.id)}
                                                                onChange={handleRadioClick}
                                                            />
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="row flex justify-end bg-gray-50 py-1 text-right">
                                                            <svg
                                                                onClick={(e: any) =>
                                                                    handleOnSubmit(e, { event })
                                                                }
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className={`h-4 w-4 cursor-pointer  transition-all duration-500 ease-in-out ${
                                                                    selectedRadioBtn === event.id
                                                                        ? "text-red-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </td>
                                                    </tr> */}
                                                    </tbody>
                                                )
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    )
}

export default Admin
