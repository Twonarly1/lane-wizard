import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import React from "react"

type Props = {
    max: number
    skip: number
    lastPage: boolean
    onClickLeft: () => {}
    onClickRight: () => {}
    showCount?: boolean
}

const Pagination = ({ max, skip, lastPage, onClickLeft, onClickRight, showCount }: Props) => {
    return (
        <div className="mx-auto mb-2 mt-2 flex w-full items-center justify-between">
            {showCount && (
                <div className="-mb-2">
                    {skip} / {max} records
                </div>
            )}
            <div className={` flex space-x-2 ${max > 100 ? "visible" : "invisible"} `}>
                <button
                    disabled={skip === 0}
                    onClick={() => onClickLeft()}
                    className="items-center rounded bg-white disabled:bg-gray-200"
                >
                    <ArrowLeftIcon className="h-6 w-6 " />
                </button>
                <button
                    disabled={lastPage}
                    onClick={() => onClickRight()}
                    className="items-center rounded bg-white disabled:bg-gray-200"
                >
                    <ArrowRightIcon className="h-6 w-6 " />
                </button>
            </div>
        </div>
    )
}

export default Pagination
