import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ADD_EVENT } from "../graphql/mutations"
import eventList from "../eventList.json"
import { GET_ATHLETE } from '../graphql/queries'

type Props = {
    athleteFound: any
}

interface IFormInput {
    time: string
    athlete: string
    event: string
    milliseconds: string
    fullName: string
}

const EventBox = ({athleteFound}: Props) => {
    const [time, setTime] = useState<any>("")
    const [addEvent] = useMutation(ADD_EVENT)
    
    const [getAthlete, { data: athlete, refetch }] =
    useLazyQuery(GET_ATHLETE)
   
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
    const onSubmit = handleSubmit(async (formData: any) => {
        const notification = toast.loading("Creating new event")
        if (time.length < 4) {
            return toast.error("wrong time input. 4 - 6 NUMBERS!", {
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
                    event: formData.event,
                    time: formattedTime,
                    milliseconds: time * 10,
                    fullName: athlete.getAthlete.fullName,
                },
            })
            console.log("New event added:", newEvent)
            
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

    // DISPLAY TIME 0:00.00 //
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
    <form onSubmit={onSubmit} className="overflow-x-auto justify-between flex flex-col">
        {/* Event */}
        <div className="flex mt-3 items-center mx-auto ">
            <p className="w-16 font-bold ">Event:</p>
            {/* register event input with react-hook-form */}
            <select
                className="ml-[2px] w-[205px] border-none rounded"
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

        {/* Time */}
        <div className="flex mt-3 items-center mx-auto">
            <p className="w-16 font-bold">Time:</p>
            <input
                className="ml-[2px] w-[205px] border-none rounded"
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
        <div className="flex my-2 h-fit text-right flex-col w-full relative border bg-gray-200 text-[40px]  justify-end">
            <p> {time.length ? displayTime() : <span className='text-gray-400'>00:00.00</span>}</p>
        </div>

        {!!watch('event') && (
        <div className=" w-full bg-white rounded justify-center flex  text-black hover:text-blue-500">
            <button
                className="w-full rounded-lg py-2 "
                type="submit"
            >
                <p>Create Event</p>
            </button>
        </div>
        )}

    </form>
 
  )
}

export default EventBox