import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_EVENT } from "graphql/mutations"
import { GET_ATHLETE } from "graphql/queries"
import { diveScore, swimMilliseconds, swimTime } from "lib/utils"

type Props = {
    athleteFound: string
    eventFound: string
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

const EventBox = ({ athleteFound, eventFound, adminTeam }: Props) => {
    const [time, setTime] = useState<any>("")
    const [addEvent] = useMutation(ADD_EVENT) // add event mutation
    const [getAthlete, { data: athlete, refetch }] = useLazyQuery(GET_ATHLETE)
    const [active, setActive] = useState<boolean>(false)
    const current = new Date()
    const date = `${
        current.getFullYear() + "-" + (current.getMonth() + 1 + "-" + current.getDate())
    }`
    // console.log(current.getDate())

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

        if (eventFound?.includes("diving")) {
            formattedDiveScore = await diveScore(time)
            milliseconds = 0
        } else {
            formattedSwimTime = await swimTime(time)
            milliseconds = swimMilliseconds(time)
        }
        // console.log("dive...", diveScore(time), "swim...", swimTime(time))
        // console.log("milliseconds", swimMilliseconds(time))
        // if (formattedSwimTime.length > 0) {
        // }

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

    return (
        <div>
            <form
                onSubmit={onSubmit}
                className="relative flex flex-col justify-between overflow-x-auto"
            >
                <div className=" mx-1 mt-4 flex w-fit space-x-2">
                    <input
                        type="number"
                        placeholder="time/score"
                        className="w-[233px]  rounded border-none "
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
