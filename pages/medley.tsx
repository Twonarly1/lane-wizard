import { useQuery } from "@apollo/client"
import { spawn } from "child_process"
import { GET_EVENTS_BY_EVENT } from "graphql/queries"
import React, { useRef, useState } from "react"
import { useEffect } from "react"

type Props = {
    isOpen: any
    setIsOpen: any
}

type Medley = {
    medleyEvents: ["Med. BA", "Med. BR", "Med. FL", "Med. FR"]
}

type Athlete = {
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

const DialogDemo = ({}: Props) => {
    const { data: backstroke } = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: "Med. BA",
        },
    })
    const { data: breaststroke } = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: "Med. BR",
        },
    })
    const { data: fly } = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: "Med. FL",
        },
    })
    const { data: free } = useQuery(GET_EVENTS_BY_EVENT, {
        variables: {
            event: "Med. FR",
        },
    })
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

    const selectBA = (params: any) => {
        setBA([params.event.id, params.event.milliseconds])
    }
    const selectBR = (params: any) => {
        setBR([params.event.id, params.event.milliseconds])
    }
    const selectFL = (params: any) => {
        setFL([params.event.id, params.event.milliseconds])
    }
    const selectFR = (params: any) => {
        setFR([params.event.id, params.event.milliseconds])
    }

    // console.log("MEDLEY...", BA[1], BR[1], FL[1], FR[1])

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

    const ref: any = useRef()
    const ref1: any = useRef()
    const ref2: any = useRef()
    const ref3: any = useRef()

    useEffect(() => {
        let text = ref.current
        text.innerHTML = text.innerText
            .split("")
            .map(
                (char: string, i: number) =>
                    `<p class="flex space-x-4 text-blue-500 text-[12px] md:text-[14px] h-1 md:h-2" style="rotate(${90}deg)" key=${i}>${char}</p>`
            )
            .join("")
    }, [])
    useEffect(() => {
        let text = ref1.current
        text.innerHTML = text.innerText
            .split("")
            .map(
                (char: string, i: number) =>
                    `<p class="flex space-x-4 text-blue-500 text-[12px] md:text-[14px] h-1 md:h-2" style="rotate(${90}deg)" key=${i}>${char}</p>`
            )
            .join("")
    }, [])
    useEffect(() => {
        let text = ref2.current
        text.innerHTML = text.innerText
            .split("")
            .map(
                (char: string, i: number) =>
                    `<p class="flex space-x-4 text-blue-500 text-[12px] md:text-[14px] h-1 md:h-2" style="rotate(${90}deg)" key=${i}>${char}</p>`
            )
            .join("")
    }, [])
    useEffect(() => {
        let text = ref3.current
        text.innerHTML = text.innerText
            .split("")
            .map(
                (char: string, i: number) =>
                    `<p class="flex space-x-4 text-blue-500 text-[12px] md:text-[14px] h-1 md:h-2" style="rotate(${90}deg)" key=${i}>${char}</p>`
            )
            .join("")
    }, [])

    return (
        <div className="w-full items-center justify-center px-4  text-center ">
            <div className="mx-auto flex w-fit">
                <div className="mb-2 ml-4 flex w-full items-center space-x-2 md:ml-0 md:justify-center">
                    <button
                        className=" bg-white px-4 text-lg"
                        onClick={calculateMedleySimulationTime}
                    >
                        calculate
                    </button>
                    <div
                        className={`items-center px-4 text-lg  ${
                            flash ? "bg-green-100" : "bg-white"
                        } `}
                    >
                        <p> {simulatedRelayTime ? simulatedRelayTime : "00:00.00"}</p>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-10 flex flex-col justify-center gap-y-6 pb-20 md:grid md:max-w-2xl md:grid-cols-2 md:gap-6 ">
                {/* Med. BA */}
                <div className="mx-auto flex w-fit">
                    <p className="mr-2 uppercase tracking-tighter " ref={ref}>
                        Back
                    </p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="px- table">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-7 text-xs">
                                                Name
                                            </th>
                                            <th scope="col" className="col text-xs">
                                                Grade
                                            </th>

                                            <th scope="col" className="col text-xss text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {backstroke?.getEventsByEvent?.map(
                                            (event: Athlete, idx: number) => (
                                                <tr key={idx} className="tr">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={(e) => selectBA({ event })}
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
                                                    <td className="row text-left text-xs">
                                                        {event.grade}
                                                    </td>

                                                    <td className="row text-right text-xs">
                                                        {event.time}
                                                    </td>
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
                <div className="mx-auto flex w-fit">
                    <p className="mr-2 uppercase tracking-tighter " ref={ref1}>
                        Breast
                    </p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-7 text-xs">
                                                Name
                                            </th>{" "}
                                            <th scope="col" className="col text-xs">
                                                Grade
                                            </th>
                                            <th scope="col" className="col text-xss text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {breaststroke?.getEventsByEvent?.map(
                                            (event: Athlete, idx: number) => (
                                                <tr key={idx} className="tr ">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={(e) => selectBR({ event })}
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
                                                    <td className="row text-left text-xs">
                                                        {event.grade}
                                                    </td>

                                                    <td className="row text-right text-xs">
                                                        {event.time}
                                                    </td>
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
                <div className="mx-auto flex w-fit">
                    <p className="mr-2 uppercase tracking-tighter " ref={ref2}>
                        FLY
                    </p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-7 text-xs">
                                                Name
                                            </th>{" "}
                                            <th scope="col" className="col text-xs">
                                                Grade
                                            </th>
                                            <th scope="col" className="col text-xss text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {fly?.getEventsByEvent?.map(
                                            (event: Athlete, idx: number) => (
                                                <tr key={idx} className="tr ">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={(e) => selectFL({ event })}
                                                        >
                                                            <input
                                                                className="radio mr-2 ml-2"
                                                                type="checkbox"
                                                                readOnly={true}
                                                                checked={isFlySelected(event.id)}
                                                            />
                                                            {event.fullName}
                                                        </button>
                                                    </td>{" "}
                                                    <td className="row text-left text-xs">
                                                        {event.grade}
                                                    </td>
                                                    <td className="row text-right text-xs">
                                                        {event.time}
                                                    </td>
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
                <div className="mx-auto flex w-fit">
                    <p className="mr-2 uppercase tracking-tighter " ref={ref3}>
                        FREE
                    </p>
                    <div className="mx-auto flex h-40 w-fit flex-col overflow-y-auto text-center md:h-80">
                        <div className="inline-block align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="table ">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="col pl-7 text-xs">
                                                Name
                                            </th>{" "}
                                            <th scope="col" className="col text-xs">
                                                Grade
                                            </th>
                                            <th scope="col" className="col text-xss text-right">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {free?.getEventsByEvent?.map(
                                            (event: Athlete, idx: number) => (
                                                <tr key={idx} className="tr ">
                                                    <td>
                                                        <button
                                                            className="flex items-center"
                                                            onClick={(e) => selectFR({ event })}
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
                                                    <td className="row text-left text-xs">
                                                        {event.grade}
                                                    </td>
                                                    <td className="row text-right text-xs">
                                                        {event.time}
                                                    </td>
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
