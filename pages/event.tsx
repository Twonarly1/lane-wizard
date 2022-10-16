import React, { useState } from "react"
import { EventDropdown, EventsFound, Footer } from "components"

const event = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>()

    return (
        <div className="mx-auto  mb-10 flex min-h-screen w-full max-w-7xl flex-col items-center">
            <EventDropdown selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
            <EventsFound selectedEvent={selectedEvent} />
        </div>
    )
}

export default event
