import { useEffect } from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Head from 'next/head'
import { ScheduleBoard } from "../components/client/scheduleBoard"

export default function Client() {
    const router = useRouter()

    const { data: session, status } = useSession()
    const isUser = !!session?.user

    // useEffect(() => {
    //     if (status !== 'authenticated') {
    //         router.push('/')
    //     }
    // }, [isUser, status])

    return (
        <>
            <Head>
                <title>Cabeleleila Leila | Cliente</title>
            </Head>

            <main>
                <ScheduleBoard />
            </main>
        </>
    )
}