import Head from 'next/head'

//Internal Components
import { ScheduleBoard } from "../components/client/scheduleBoard"

export default function Client() {
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