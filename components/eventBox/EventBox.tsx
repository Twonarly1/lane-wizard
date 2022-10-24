import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_EVENT } from "graphql/mutations"
import { GET_ATHLETE } from "graphql/queries"
import { diveScore, swimMilliseconds, swimTime } from "lib/utils"
import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Menu, Transition } from "@headlessui/react"

const year: string[] = ["2021", "2022"]
const monthList: any = [
    { month: "January", id: "01" },
    { month: "February", id: "02" },
    { month: "March", id: "03" },
    { month: "April", id: "04" },
    { month: "May", id: "05" },
    { month: "June", id: "06" },
    { month: "July", id: "07" },
    { month: "August", id: "08" },
    { month: "September", id: "09" },
    { month: "October", id: "10" },
    { month: "November", id: "11" },
    { month: "December", id: "12" },
]
const day: string[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
]

type Props = {
    athleteFound: string
    eventFound: string
    adminTeam: string
}

type MonthList = {
    month: string
    id: number
}

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
    grade: number
    year: string[]
    month: string[]
    day: string[]
}

const EventBox = ({ athleteFound, eventFound, adminTeam }: Props) => {
    const [time, setTime] = useState<any>("")
    const [addEvent] = useMutation(ADD_EVENT) // add event mutation
    const [getAthlete, { data: athlete, refetch }] = useLazyQuery(GET_ATHLETE)
    const [active, setActive] = useState<boolean>(false)
    const current = new Date()
    const todaysDate = `${
        current.getFullYear() + "-" + (current.getMonth() + 1 + "-" + current.getDate())
    }`
    const [chosenYear, setYear] = useState<string>("")
    const [chosenMonth, setMonth] = useState<any>("")
    const [chosenDay, setDay] = useState<string>("")

    const renderOption = (value: string | number) => {
        return <option key={value}>{value}</option>
    }
    const renderMonthOptions = (value: MonthList, key: number) => {
        return (
            <option key={value.id}>
                {value.id} {value.month}
            </option>
        )
    }

    useEffect(() => {
        if (!athleteFound) return
        getAthlete({
            variables: {
                fullName: athleteFound,
            },
        })
    }, [athleteFound])

    //////  REACT HOOK FORM  ////////
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()

    const onSubmit = handleSubmit(async (formData: IFormInput) => {
        const notification = toast.loading("Creating new event")

        // throw error if input length less than 2
        if (time.length < 2) {
            return toast.error("wrong time input. 2 - 6 NUMBERS!", {
                id: notification,
            })
        }

        // format swim time or dive score
        let formattedSwimTime: any | undefined = ""
        let formattedDiveScore: string | undefined = ""
        let milliseconds: any | undefined = ""
        let date: any | undefined = ""

        if (eventFound?.includes("diving")) {
            formattedDiveScore = await diveScore(time)
            milliseconds = 0
        } else {
            formattedSwimTime = await swimTime(time)
            milliseconds = swimMilliseconds(time)
        }
        // console.log("dive...", diveScore(time), "swim...", swimTime(time))
        // console.log("milliseconds", swimMilliseconds(time))

        if (chosenYear && chosenMonth && chosenDay) {
            date = chosenYear + "-" + chosenMonth + "-" + chosenDay
        } else {
            date = todaysDate
        }

        try {
            console.log("Creating event...", formData)
            const {
                data: { insertEvent: newEvent },
            } = await addEvent({
                variables: {
                    athlete: athlete.getAthlete.id,
                    grade: athlete.getAthlete.grade,
                    event: eventFound,
                    time: formattedSwimTime || formattedDiveScore,
                    milliseconds: milliseconds,
                    fullName: athlete.getAthlete.fullName,
                    date: date,
                    team: adminTeam.toString(),
                },
            })
            console.log("New event added:", newEvent)

            //set value fields to empty string after event is created
            setValue("athlete", "")
            setValue("event", "")
            setValue("time", "")
            setValue("milliseconds", "")
            setValue("fullName", "")

            //alert success
            toast.success("New Event Created!", {
                id: notification,
            })
        } catch (error) {
            //alert error
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
        }
    })
    //////  REACT HOOK FORM  ////////

    const watchYear: any = watch("year")
    const watchMonth: any = watch("month")
    const watchDay: any = watch("day")

    useEffect(() => {
        if (watchYear) setYear(watchYear)
        if (watchDay) setDay(watchDay)
        if (watchMonth) {
            let split = watchMonth.split(" ")
            return setMonth(split[0])
        }
    }, [watchYear, watchMonth, watchDay])

    return (
        <div>
            <Menu as="div" className="comboboxInput ml-1 mt-4">
                <div className="relative rounded">
                    <Menu.Button
                        placeholder="select date"
                        className="inline-flex w-full items-center justify-between rounded border border-none bg-white py-2"
                    >
                        <p className="ml-2 text-gray-500">
                            {chosenYear && chosenMonth && chosenDay
                                ? chosenYear + "-" + chosenMonth + "-" + chosenDay
                                : "select date"}
                        </p>
                        <ChevronDownIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-10 mt-2 w-[233px] rounded bg-blue-200 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="rounded p-2">
                            <div className="flex flex-col gap-y-2 rounded bg-blue-200">
                                <select
                                    className="cursor-pointer rounded border-none shadow ring-1 ring-black ring-opacity-5"
                                    {...register("year")}
                                >
                                    {year.map(renderOption)}
                                </select>
                                <select
                                    className="cursor-pointer rounded border-none shadow ring-1 ring-black ring-opacity-5"
                                    {...register("month")}
                                >
                                    {monthList.map(renderMonthOptions)}
                                </select>
                                <select
                                    className="cursor-pointer rounded border-none shadow ring-1 ring-black ring-opacity-5"
                                    {...register("day")}
                                >
                                    {day.map(renderOption)}
                                </select>
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <form
                onSubmit={onSubmit}
                className="relative flex flex-col justify-between overflow-x-auto"
            >
                <div className=" mx-1 mt-4 flex w-fit flex-col space-x-2">
                    <input
                        type="number"
                        placeholder="time/score"
                        className="w-[233px] rounded border-none shadow ring-1 ring-black ring-opacity-5"
                        autoComplete="off"
                        {...register("time", {
                            required: true,
                            minLength: 2,
                            maxLength: 6,
                            valueAsNumber: true,
                        })}
                        onChange={(e) => {
                            setTime(e.target.value)
                            setActive(true)
                        }}
                    />
                </div>

                {/* display formatted swimTime or diveScore */}
                <div className="my-3 mx-1 text-right text-[40px]">
                    <p>
                        {eventFound?.includes("diving") && time.length
                            ? diveScore(time) || <span className="text-gray-400">000.00</span>
                            : swimTime(time) || <span className="text-gray-400">00:00.00</span>}
                    </p>
                </div>

                {athleteFound && (
                    <div className=" mx-1 mb-1 flex justify-center rounded bg-white shadow ring-1 ring-black ring-opacity-5 hover:text-blue-500">
                        <button className="w-full rounded py-2" type="submit">
                            <p>Create Event</p>
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EventBox
