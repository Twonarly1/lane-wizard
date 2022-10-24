import Link from "next/link"

export default function Home() {
    return (
        <div className=" overflow-hidden ">
            <div className="relative pb-16 sm:pb-24">
                <main className="mx-auto mt-16 max-w-lg px-4 sm:mt-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-600 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Data to enrich your</span>{" "}
                            <span className="block text-indigo-600 xl:inline">
                                Swim & Dive Team
                            </span>
                        </h1>
                        <p className="mx-auto  mt-5 max-w-md rounded-md bg-white/90 p-8 text-left text-base text-gray-500 sm:text-lg md:max-w-3xl md:text-xl">
                            Personalized data entered by administered team coaches. View your entire
                            teams data in one concise application. Built for time management, quick
                            event creation, simulating relays, automatic averages calculated for
                            swimmer based on athlete events.
                        </p>
                        <p className="mx-auto mt-5 max-w-md rounded-md bg-white/90 p-3 text-left text-base text-gray-500 sm:text-lg md:max-w-3xl md:text-xl">
                            Athletes or visitors can view events.
                        </p>
                        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                            <Link href="/event" className="rounded-md shadow">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                                >
                                    Get started
                                </a>
                            </Link>
                            <div className="mt-3 hidden rounded-md shadow sm:mt-0 sm:ml-3">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                                >
                                    Live demo
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
