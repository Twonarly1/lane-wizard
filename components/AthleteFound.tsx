import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    athleteFound: any
}

const AthleteFound = ({athleteFound}: Props) => {
    const router = useRouter()

  return (
    <div className='mb-2'>
        {athleteFound ? (
            <div className='w-full items-center justify-between flex'> 
                <div className="flex space-x-2 text-blue-500">
                    <p className="">
                        {athleteFound?.firstName + " " + athleteFound?.lastName + ","}
                    </p>
                    <p className="">{athleteFound?.grade}</p>
                </div>
                <svg
                onClick={() => router.reload()}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-pointer animate-wiggle">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
        </div>
        ) : (
            <p className=" text-gray-500 font-light">Select athlete for data...</p>
        )}
    </div>
  )
}

export default AthleteFound