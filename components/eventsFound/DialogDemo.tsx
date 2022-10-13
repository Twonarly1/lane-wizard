import { Dialog } from "@headlessui/react"
import { XCircleIcon } from "@heroicons/react/20/solid"
import React from "react"

type Props = {
    isOpen: any
    setIsOpen: any
}

const DialogDemo = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
            <div className="fixed inset-0 w-full bg-black/60" aria-hidden="true" />
            <div className="  fixed inset-0 mt-[12%] flex h-fit  justify-center">
                <Dialog.Panel className="relative w-full max-w-lg rounded-2xl bg-white">
                    <Dialog.Title className=" h-12 text-center text-lg">
                        <p className="pt-3">How to simulate?</p>
                    </Dialog.Title>

                    <video controls className="rounded-b-2xl">
                        <source
                            src="./demoSimulation.mp4"
                            className="rounded-xl"
                            type="video/mp4"
                        />
                    </video>

                    <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                        <XCircleIcon className="h-8 w-8 rounded-full text-gray-500" />
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default DialogDemo
