import Link from 'next/link'
import React from 'react'
import Footer from './Footer'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="flex w-fit mx-auto bg-gray-200 pt-4 pb-4 justify-center">
        <Link href="/" className="">
            <a className="links">Create Event</a>
        </Link>
        <Link href="/event" className="">
            <a className="links">Event Ranking</a>
        </Link>
        <Link href="/all" className="">
            <a className="links">All Times</a>
        </Link>
       
    </header>
  )
}

export default Header