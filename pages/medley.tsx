import { useLazyQuery } from "@apollo/client"
import { Dialog } from "@headlessui/react"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { GET_EVENTS_BY_EVENT } from "graphql/queries"
import React, { useState } from "react"
import { useEffect } from "react"

type Props = {
    isOpen: any
    setIsOpen: any
}

const DialogDemo = ({}: Props) => {
    const [getRelayEvent, { error, loading, data }] = useLazyQuery(GET_EVENTS_BY_EVENT)

    const getAllMedleyEvents = () => {
        getRelayEvent({ variables: { event: "Med. BA" } })
    }

    useEffect(() => {
        getAllMedleyEvents()
    }, [])

    console.log(data)

    return <div></div>
}

export default DialogDemo
