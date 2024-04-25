import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react'

//Libs
import { FcGoogle } from "react-icons/fc";
import { IoMdExit } from "react-icons/io";

//API Endpoints
import { getAdminAccounts } from '../../pages/api/schedule-api';

//Custom Styles
import { AuthContainer, HeaderContainer, Button } from "./styles";

export function Header() {
    const router = useRouter()

    const { data: session, status } = useSession()
    const isAuthenticated = !!session?.user

    useEffect(() => {
        if (status === "loading") return

        if (!isAuthenticated) {
            router.push('/')
        }

        getAdminAccounts(session?.user?.email)
            .then(() => {
                router.push('/admin')
            })
            .catch(() => {
                router.push('/client')
            })

    }, [isAuthenticated, status])

    return (
        <HeaderContainer>
            <h2>Cabeleleila<span>.</span>Leila</h2>

            <AuthContainer>
                {isAuthenticated ? (
                        <Button onClick={() => signOut()}>
                            <img src={session.user.image} alt="user image" />
                            {session.user.name} 
                            <IoMdExit />
                        </Button>
                ) : (
                        <Button onClick={() => signIn('google')}>
                            <FcGoogle />  Entrar com Google
                        </Button>
                )}
            </AuthContainer>
        </HeaderContainer>
    )
}