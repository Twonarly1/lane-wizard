import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_EVENT } from "../graphql/mutations"
import eventList from "../eventList.json"

type Props = {
    athleteFound: any
    setSelectedPerson: any
}

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
}

const EventBox = ({athleteFound, setSelectedPerson}: Props) => {
    const [time, setTime] = useState<any>("")
    const [addEvent] = useMutation(ADD_EVENT)

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()
    const onSubmit = handleSubmit(async (formData: any) => {
        const notification = toast.loading("Creating new event")
        if (time.length < 4) {
            return toast.error("wrong time input. 4 - 6 NUMBERS!", {
                id: notification,
            })
        }
        const formattedTime = displayTime()

        try {
            //create event...
            console.log("Event is new! -> creating a NEW event!")
            console.log("Creating event...", formData)

            const {
                data: { insertEvent: newEvent },
            } = await addEvent({
                variables: {
                    athlete: athleteFound?.id,
                    event: formData.event,
                    time: formattedTime,
                    milliseconds: time * 10,
                    fullName: athleteFound?.firstName + " " + athleteFound?.lastName,
                },
            })
            console.log("New event added:", newEvent)

            setValue("athlete", "")
            setValue("event", "")
            setValue("time", "")
            setValue("milliseconds", "")
            setValue("fullName", "")

            setSelectedPerson({})

            toast.success("New Event Created!", {
                id: notification,
            })
        } catch (error) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
        }
    })

    const displayTime = () => {
        if (time.length === 1) {
            return time[0]
        }
        if (time.length === 2) {
            return time[0] + time[1]
        }
        if (time.length === 3) {
            return time[0] + time[1] + "." + time[2]
        }
        if (time.length === 4) {
            return time[0] + time[1] + "." + time[2] + time[3]
        }
        if (time.length === 5) {
            return "0" + time[0] + ":" + time[1] + time[2] + "." + time[3] + time[4]
        }
        if (time.length === 6) {
            return time[0] + time[1] + ":" + time[2] + time[3] + "." + time[4] + time[5]
        }
    }

  return (
    <div> 
        <form onSubmit={onSubmit} className="sm:flex flex-col gap-y-2 mt-2">
            <div className="flex w-[260px] sm:w-full sm:flex-row flex-col sm:items-center sm:space-x-3">
                <label htmlFor="" className="w-24">
                    <b>Event:</b>
                </label>
                {/* register event input with react-hook-form */}
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
                </select>
            </div>
            <div className="flex mt-2 sm:mt-0 w-[260px] sm:w-full sm:flex-row flex-col sm:items-center sm:space-x-3">
                <label htmlFor="" className="w-24">
                    <b>Time:</b>
                </label>
                {/* register time input with react-hook-form */}
                <input
                    className="comboboxInput"
                    {...register("time", {
                        required: true,
                        minLength: 4,
                        maxLength: 6,
                        valueAsNumber: true,
                    })}
                    onChange={(event) => setTime(event.target.value)}
                    type="text"
                    placeholder="enter 4-6 numbers"
                />
            </div>
            {/* display formatted time 00:00:00 */}
            <div className="flex flex-col w-[260px] sm:w-full relative rounded-2xl py-2 border bg-gray-200 text-[40px] items-center justify-center">
                <p className=""> {time.length && displayTime()}</p>
                {/* time converted to milliseconds */}
                <div className="flex text-xs  text-gray-500 space-x-1">
                    <p>ms: </p>
                    <p>{time * Number(10)}</p>
                </div>
            </div>
            {!!watch('event') && (
            <div className="border w-[260px] sm:w-full border-gray-500 rounded-lg justify-center flex  text-black hover:text-blue-500">
                <button
                    className="border  w-[260px] sm:w-full rounded-lg py-2 "
                    type="submit"
                >
                    <p>Create Event</p>
                </button>
            </div>
            )}
            
            

            {/* Errors */}
            {Object.keys(errors).length > 0 && (
                <div className="space-y-2 p-2 text-red-500">
                    {errors.athlete?.type === "required" && (
                        <p>- An athlete is required</p>
                    )}

                    {errors.event?.type === "required" && (
                        <p>- An event is required</p>
                    )}
                </div>
            )}
        </form>
    </div>
  )
}

export default EventBox