import { useSession } from "next-auth/react"
import { useEffect, useState, Fragment } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid"
import { Listbox, Transition } from "@headlessui/react"
import { useMutation } from "@apollo/client"
import { ADD_FEEDBACK } from "graphql/mutations"
import toast from "react-hot-toast"
import Link from "next/link"

const moods = [
    {
        name: "Excited",
        value: "excited",
        icon: FireIcon,
        iconColor: "text-white",
        bgColor: "bg-red-500",
    },
    {
        name: "Loved",
        value: "loved",
        icon: HeartIcon,
        iconColor: "text-white",
        bgColor: "bg-pink-400",
    },
    {
        name: "Happy",
        value: "happy",
        icon: FaceSmileIcon,
        iconColor: "text-white",
        bgColor: "bg-green-400",
    },
    {
        name: "Sad",
        value: "sad",
        icon: FaceFrownIcon,
        iconColor: "text-white",
        bgColor: "bg-yellow-400",
    },
    {
        name: "Thumbsy",
        value: "thumbsy",
        icon: HandThumbUpIcon,
        iconColor: "text-white",
        bgColor: "bg-blue-500",
    },
    {
        name: "I feel nothing",
        value: null,
        icon: XMarkIcon,
        iconColor: "text-gray-400",
        bgColor: "bg-transparent",
    },
]

type FormData = {
    name: string
    feedback: string
    admin: boolean
    email: string
}

export default function Feedback() {
    const { data: session }: any = useSession()
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [addFeedback] = useMutation(ADD_FEEDBACK)

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading("Creating new event")

        try {
            console.log("Creating Feedback...", formData)
            const data = await addFeedback({
                variables: {
                    admin: false,
                    email: session?.user.email,
                    name: session?.user.name,
                    feedback: formData.feedback,
                },
            })
            console.log("New feedback added!", data)

            //set value fields to empty string after event is created
            setValue("admin", false)
            setValue("email", "")
            setValue("name", "")
            setValue("feedback", "")

            //alert success
            toast.success("New Event Created!", {
                id: notification,
            })
        } catch (error) {
            //alert error
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
        }
    })

    useEffect(() => {
        if (!session) return
        setEmail(session.user.email)
        setName(session.user.name)
        setImage(session.user.image)
    }, [session])

    return (
        <div className="mx-auto mt-8 max-w-lg ">
            {session ? (
                <div className="flex flex-shrink-0 items-center space-x-3">
                    <img className="inline-block h-10 w-10 rounded-full" src={image} alt="" />
                    <div className="text-xs">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                </div>
            ) : (
                <Link href={"/auth/signin"}>
                    <a>Please Login</a>
                </Link>
            )}
            <form onSubmit={onSubmit} className="static z-50 mt-2 rounded-md">
                <div className="flex flex-col py-2">
                    <div className="  flex">
                        <textarea
                            className="h-40 flex-1 rounded border-none p-2 shadow outline-none ring-1 ring-black ring-opacity-5 placeholder:absolute "
                            {...register("feedback", { required: true })}
                            // type="text"
                            placeholder="feedback..."
                        />
                    </div>
                </div>

                {!!watch("feedback") && (
                    <div className=" mt-2 flex justify-center rounded bg-white shadow ring-1 ring-black ring-opacity-5 hover:text-blue-500">
                        <button className="w-full rounded py-2" type="submit">
                            Create Post
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
