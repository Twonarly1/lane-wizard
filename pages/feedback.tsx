import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { ADD_FEEDBACK } from "graphql/mutations"
import toast from "react-hot-toast"
import Link from "next/link"

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
        const notification = toast.loading("Submitting...")

        try {
            console.log("Adding Feedback...", formData)
            const data = await addFeedback({
                variables: {
                    admin: false,
                    email: session?.user.email,
                    name: session?.user.name,
                    feedback: formData.feedback,
                },
            })
            console.log("New feedback added!", data)

            setValue("admin", false)
            setValue("email", "")
            setValue("name", "")
            setValue("feedback", "")

            toast.success("Feedback submitted!", {
                id: notification,
            })
        } catch (error) {
            toast.error("Whoops, something went wrong!", {
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
        <div className="mx-auto mt-8 max-w-md ">
            {session ? (
                <div className="flex flex-shrink-0 items-center space-x-3">
                    <img className="inline-block h-10 w-10 rounded-full" src={image} alt="" />
                    <div className="text-xs">
                        <b>{name}</b>
                        <br />
                        <i>{email}</i>
                    </div>
                </div>
            ) : (
                <div className="mt-2 flex w-32 justify-center rounded bg-white py-2 shadow ring-1 ring-black ring-opacity-5 hover:text-blue-500">
                    <Link href={"/auth/signin"}>
                        <a>Please Login</a>
                    </Link>
                </div>
            )}
            <form onSubmit={onSubmit} className="static z-50 mt-2 rounded">
                <textarea
                    disabled={!session}
                    className="h-40 w-full rounded border-none p-2 shadow outline-none ring-1 ring-black ring-opacity-5 placeholder:absolute disabled:cursor-not-allowed "
                    {...register("feedback", { required: true })}
                    placeholder="Feedback, requests, inquiries all accepted..."
                />

                {!!watch("feedback") && (
                    <div className="mt-2 flex w-full justify-end rounded bg-white shadow ring-1 ring-black ring-opacity-5 hover:text-blue-500">
                        <button className="w-full rounded py-2" type="submit">
                            Send Feedback
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
