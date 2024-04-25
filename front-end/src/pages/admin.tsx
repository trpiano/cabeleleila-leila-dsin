import Head from 'next/head'

//Internal Components
import AdminScheduleBoard from "../components/admin/adminScheduleBoard";

export default function Admin() {
    return (
        <>
            <Head>
                <title>Cabeleleila Leila | Admin</title>
            </Head>

            <main>
                <AdminScheduleBoard />
            </main>
        </>
    )
}