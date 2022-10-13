import React from "react"

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className="pb-2">
            <a className="" href="https://beau-hawkinson.vercel.app/">
                <footer
                    data-text="Hover and wave 🌊"
                    className="relative mx-auto w-fit overflow-hidden pb-2 text-sm before:absolute before:animate-wave before:whitespace-nowrap before:text-transparent before:underline before:decoration-sky-400 before:decoration-wavy before:underline-offset-8 before:content-[attr(data-text)attr(data-text)attr(data-text)attr(data-text)]"
                >
                    ©️ bhawkinson
                </footer>
            </a>
        </div>
    )
}

export default Footer
