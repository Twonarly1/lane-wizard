import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_EVENT } from "graphql/mutations"
import eventList from "eventList.json"
import { GET_ATHLETE } from "graphql/queries"

type Props = {
    athleteFound: string
    eventFound: any
}

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
}

const EventBox = ({ athleteFound, eventFound }: Props) => {
    const [time, setTime] = useState<any>("")
    const [addEvent] = useMutation(ADD_EVENT)
    const [getAthlete, { data: athlete, refetch }] = useLazyQuery(GET_ATHLETE)

    console.log(eventFound)

    useEffect(() => {
        if (!athleteFound) {
            return
        } else {
            getAthlete({
                variables: {
                    fullName: athleteFound,
                },
            })
        }
    }, [athleteFound])

    // REACT HOOK FORM //
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()

    // ON SUBMIT //
    const onSubmit = handleSubmit(async (formData: IFormInput) => {
        const notification = toast.loading("Creating new event")
        console.log(formData)

        if (time.length < 2) {
            return toast.error("wrong time input. 2 - 6 NUMBERS!", {
                id: notification,
            })
        }
        const formattedTime = displayTime()
        try {
            console.log("Creating event...", formData)
            const {
                data: { insertEvent: newEvent },
            } = await addEvent({
                variables: {
                    athlete: athlete.getAthlete.id,
                    event: eventFound.name,
                    time: formattedTime,
                    milliseconds: time * 10,
                    fullName: athlete.getAthlete.fullName,
                },
            })
            console.log("New event added:", newEvent)

            //set value fields to empty string after event is created
            setValue("athlete", "")
            setValue("event", "")
            setValue("time", "")
            setValue("milliseconds", "")
            setValue("fullName", "")

            toast.success("New Event Created!", {
                id: notification,
            })
        } catch (error) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
        }
    })

    // DISPLAY TIME 00:00.00 //
    const displayTime = () => {
        if (!isNaN(time) && time.length === 1) {
            return "00:0" + time[0] + ".00" //00.01.00
        }
        if (time.length === 2) {
            return "00:" + time[0] + time[1] + ".00" //00:11.00
        }
        if (time.length === 3) {
            return "00:" + time[0] + time[1] + "." + time[2] + "0" //00:11.10
        }
        if (time.length === 4) {
            return "00:" + time[0] + time[1] + "." + time[2] + time[3] //00:11.11
        }
        if (time.length === 5) {
            return "0" + time[0] + ":" + time[1] + time[2] + "." + time[3] + time[4] //01:11.11
        }
        if (time.length === 6) {
            return time[0] + time[1] + ":" + time[2] + time[3] + "." + time[4] + time[5] //11:11.11
        }
    }

    return (
        <div>
            {/* <p>You have privileges to create events for ....</p> */}
            <form onSubmit={onSubmit} className="form">
                {/* Event */}
                {/* <label className="mt-3">Event:</label>
                <select
                    className="comboboxInput"
                    placeholder="Event"
                    {...register("event", { required: true })}
                >
                    {eventList.map((event: any, i: number) => {
                        return (
                            <option key={i} value={event.name}>
                                {event.name}
                            </option>
                        )
                    })}
                </select> */}

                {/* Time */}
                <label className="mt-2">Time:</label>
                <input
                    className="comboboxInput "
                    {...register("time", {
                        required: true,
                        minLength: 2,
                        maxLength: 6,
                        valueAsNumber: true,
                    })}
                    autoComplete="off"
                    onChange={(e) => {
                        setTime(e.target.value)
                    }}
                    type="number"
                    placeholder="requires 2-6 numbers"
                />

                {/* display formatted time 00:00:00 */}
                <div className="my-3 text-right text-[40px]">
                    <p>
                        {" "}
                        {time.length ? (
                            displayTime()
                        ) : (
                            <span className="text-gray-400">00:00.00</span>
                        )}
                    </p>
                </div>

                <div className=" flex w-full justify-center rounded bg-white hover:text-indigo-500">
                    <button className="w-full rounded-lg py-2 " type="submit">
                        <p>Create Event</p>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EventBox
