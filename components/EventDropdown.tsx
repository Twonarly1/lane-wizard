import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

type Props = {
    selectedEvent: any
    setSelectedEvent: any
    setQuery: any
    filteredEvents: any
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function EventDropdown({selectedEvent, setSelectedEvent, setQuery, filteredEvents}: Props) {

  return (
    <Combobox 
    as="div" 
    className="mt-6 flex items-center space-x-4 mx-auto max-w-md" 
    value={selectedEvent} 
    onChange={setSelectedEvent}
    >
        <p className="text-black w-14 font-bold">Event:</p>
        <div className="relative">
            <Combobox.Input
            className="comboboxInput"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(event: any) => event?.name}
            />
            <Combobox.Button className="comboboxButton">
                <ChevronDownIcon 
                    className="h-5 w-5 text-gray-500" 
                    aria-hidden="true" 
                />
            </Combobox.Button>

            {filteredEvents.length > 0 && (
                <Combobox.Options className="comboboxOptions">
                    {filteredEvents.map((person: any, i:number) => (
                        <Combobox.Option
                            key={i}
                            value={person}
                            className={({ active }) =>
                            classNames(
                                "relative cursor-default select-none py-2",
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            )
                            }
                        >
                            {({ active, selected }) => (
                            <>
                                <span className={classNames('ml-3 truncate', selected && 'font-semibold')}
                                >
                                    {person.name}
                                </span>

                                {selected && (
                                <span
                                    className={classNames(
                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                    active ? 'text-white' : 'text-indigo-600'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                )}
                            </>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            )}
      </div>
    </Combobox>
  )
}
