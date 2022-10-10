import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
   <div className='pb-2'>
     <a 
    className=''
    href="https://beau-hawkinson.vercel.app/"
    >
        <footer 
        data-text="Hover and wave 🌊" 
        className="mx-auto w-fit text-sm relative overflow-hidden pb-2 before:content-[attr(data-text)attr(data-text)attr(data-text)attr(data-text)] before:underline before:underline-offset-8 before:decoration-wavy before:decoration-sky-400 before:absolute before:whitespace-nowrap before:text-transparent before:animate-wave"
        >
            ©️ bhawkinson 
        </footer>
    </a>
   </div>
       
    
  )
}

export default Footer