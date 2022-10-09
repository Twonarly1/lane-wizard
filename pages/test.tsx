import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

const year: string[] = ['2022', '2023', '2024']
const monthList: string[] = ['January', 'February', 'March', "April", "May", "June", "July", "August", "September","October","November","December"]
const day: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ]


interface IFormInput {
year: string[]
season: string[]
month: string[]
day: number[]
team: string
}



const Test = () => {
   const [meetStarted, setMeetStarted] = useState<boolean>(false)
   const { register, handleSubmit, watch } = useForm<IFormInput>();
   const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

   console.log("year", watch("year"))
   console.log("season", watch("season"))
   console.log("month", watch("month"))
   console.log("day", watch("day"))
   console.log("team", watch("team"))

    const StartMeetButton = () => {
        if (!meetStarted) {setMeetStarted(true)} else {setMeetStarted(false)}
    }

    const renderOption = (value: string | number) => {
        return <option key={value}>{value}</option>
      }
    

  return (
    <>
    <button 
    onClick={() => StartMeetButton()} 
    className={`bg-blue-500 w-32 px-4 rounded-full ${!meetStarted ? "bg-blue-500" : "bg-red-500"}`}>
        {!meetStarted ? <p>Start Meet</p> : <p>Cancel Meet</p> }
    </button>
    {meetStarted &&
        <form className='grid grid-cols-1 w-32' onSubmit={handleSubmit(onSubmit)}>
        <label>Year/Season</label>
        <select {...register("year")}>{year.map(renderOption)}</select>
        <label>Month</label>
        <select {...register("month")}>{monthList.map(renderOption)}</select>
        <label>Day</label>
        <select {...register("day")}>{day.map(renderOption)}</select>
        <label>Team</label>
        <input type="text" {...register("team")} />
        <input type="submit" />
      </form>
      }

    </>
  )
}

export default Test