import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useQuery } from "@apollo/client"
import { GET_ATHLETES } from "graphql/queries"

const year: string[] = ["2022", "2023", "2024"]
const monthList: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const day: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31,
]
const team: string[] = ["Sartell", "foo", "bar"]
const event: string[] = [
    "Med. BA",
    "Med. BR",
    "Med. FL",
    "Med. FR",
    "200 free",
    "IM",
    "50 free",
    "100 fly",
    "100 free",
    "500 free",
    "200 free relay",
    "100 backstroke",
    "100 breastroke",
    "400 free relay",
    "100 individual medley",
    "diving 6",
    "diving 11",
]

interface IFormInput {
    year: string[]
    season: string[]
    month: string[]
    day: number[]
    team: string[]
    event: string[]
    athlete: any[]
}

const Test = () => {
    const [query, setQuery] = useState<string>("")
    const {
        error: athletesError,
        loading: athletesLoading,
        data: getAthleteList,
    } = useQuery(GET_ATHLETES)

    const [meetStarted, setMeetStarted] = useState<boolean>(false)
    const { register, handleSubmit, watch } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    console.log("WATCH....year", watch("year"))
    // console.log("season", watch("season"))
    console.log("WATCH....month", watch("month"))
    console.log("WATCH....day", watch("day"))
    console.log("WATCH....team", watch("team"))
    console.log("WATCH....event", watch("event"))
    console.log("WATCH....athlete", watch("athlete"))

    const StartMeetButton = () => {
        if (!meetStarted) {
            setMeetStarted(true)
        } else {
            setMeetStarted(false)
        }
    }

    // Filter athletes
    const filteredAthletes =
        query === ""
            ? getAthleteList?.getAthleteList
            : getAthleteList?.getAthleteList?.filter(
                  (athlete: { firstName: string; lastName: string }) => {
                      return athlete.firstName.toLowerCase().includes(query.toLowerCase())
                  }
              )

    const renderOption = (value: string | number) => {
        return <option key={value}>{value}</option>
    }

    if (athletesLoading) return <p className="loading">Loading ...</p>
    if (athletesError) return <pre>{JSON.stringify(athletesError, null, 2)}</pre>

    return (
        <div className="mx-auto w-full">
            <div className="text-center">
                <button
                    onClick={() => StartMeetButton()}
                    className={`w-32 rounded-full  bg-blue-500 px-4 ${
                        !meetStarted ? "bg-blue-500" : "bg-red-500"
                    }`}
                >
                    {!meetStarted ? <p>Start Meet</p> : <p>Cancel Meet</p>}
                </button>
            </div>
            {meetStarted && (
                <form className="form mx-auto mt-10 w-fit" onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="flex items-center space-x-2">
                        <input className="w-20" type="number" placeholder="01" />
                        <p className="">/</p>
                        <input className="w-20" type="number" placeholder="31" />
                        <p className="">/</p>
                        <input className="w-24" type="number" placeholder="2022" />
                    </div> */}
                    <div className="flex items-center space-x-2">
                        <label>Year/Season</label>
                        <select {...register("year")}>{year.map(renderOption)}</select>
                        <label>Month</label>
                        <select {...register("month")}>{monthList.map(renderOption)}</select>
                        <label>Day</label>
                        <select {...register("day")}>{day.map(renderOption)}</select>
                    </div>
                    <label>Team</label>
                    <select {...register("team")}>{team.map(renderOption)}</select>
                    <label>Event</label>
                    <select {...register("event")}>{event.map(renderOption)}</select>
                    <label>Athlete</label>
                    <select {...register("athlete", { required: true })}>
                        {filteredAthletes.map((athlete: any, i: number) => {
                            return (
                                <option key={i} value={athlete.firstName + athlete.lastName}>
                                    {athlete.firstName + " " + athlete.lastName}
                                </option>
                            )
                        })}
                    </select>
                    <input className="mt-10 cursor-pointer border border-black p-2" type="submit" />
                </form>
            )}
        </div>
    )
}

export default Test

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
