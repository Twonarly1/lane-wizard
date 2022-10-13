import { ChevronDownIcon } from "@heroicons/react/20/solid"
import React, { useState } from "react"
import { useEffect } from "react"

type Props = {
    data: any
}

type Athlete = {
    firstName: string
    grade: number
    id: string
    lastName: string
    __typename: string
}

function SearchBar({ data }: Props) {
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleFilter = (event: any) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = data.filter((athlete: Athlete) => {
            return (athlete.firstName + athlete.lastName)
                .toLowerCase()
                .includes(searchWord.toLowerCase())
        })

        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    const alphebetize = data?.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName))

    const clearInput = () => {
        setFilteredData([])
        setWordEntered("")
    }

    const handleInputClick = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    return (
        <div className="relative flex flex-col">
            <div className="searchInputs">
                <div className="relative mb-2 flex max-w-[260px]">
                    <input
                        className="border-none focus:outline-none"
                        onMouseDown={handleInputClick}
                        type="text"
                        placeholder="enter athlete"
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                    <button className="ml-2 w-6 bg-white text-center" onClick={clearInput}>
                        X
                    </button>
                </div>
                <div
                    className={` h-fit w-80 bg-white ${
                        isOpen && filteredData.length == 0 ? "visible z-50" : "invisible z-0"
                    }`}
                >
                    <b>alphebetize</b>
                    {alphebetize?.map((athlete: Athlete, idx: number) => {
                        return (
                            <div
                                onClick={() => {
                                    setWordEntered(athlete.firstName + athlete.lastName)
                                    setIsOpen(false)
                                }}
                                key={idx}
                                className="flex space-x-2"
                            >
                                <p> {athlete.firstName}</p>
                                <p> {athlete.lastName}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div
                    className={`absolute top-0 mt-16 w-80 bg-white ${
                        isOpen ? "visible z-50" : "invisible z-0"
                    }`}
                >
                    <b>filtered</b>
                    {filteredData.slice(0, 15).map((athlete: Athlete, key) => {
                        return (
                            <div
                                onClick={() => {
                                    setWordEntered(athlete.firstName + athlete.lastName)
                                    setIsOpen(false)
                                }}
                                className="flex space-x-2"
                                key={key}
                            >
                                <p>{athlete.firstName}</p>
                                <p>{athlete.lastName}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
