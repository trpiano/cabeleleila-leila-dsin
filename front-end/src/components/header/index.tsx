import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { FcGoogle } from "react-icons/fc";
import { IoMdExit } from "react-icons/io";

import { useSession, signIn, signOut } from 'next-auth/react'

import { AuthContainer, HeaderContainer, Button } from "./styles";


export function Header() {
    const router = useRouter()

    const { data: session, status } = useSession()
    const isUser = !!session?.user

    useEffect(() => {
        if (status === "loading") return
        if (!isUser) {
            router.push('/')
        }

        // ! TODO: Add role in the session data

        // if(session?.user?.email){
        //     session.user.roles = {  }
        // }

        isUser
            ? session?.user?.email === "timoteopiano@gmail.com" ? router.push('/client') : router.push('/admin')
            : router.push('/')

    }, [isUser, status])

    return (
        <HeaderContainer>
            <h2>Cabeleleila<span>.</span>Leila</h2>

            <AuthContainer>
                {isUser ? (
                    <>
                        <Button onClick={() => signOut()}>
                            <img src={session.user.image} alt="user image" />
                            {session.user.name} 
                            <IoMdExit />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => signIn('google')}>
                            <FcGoogle />  Entrar com Google
                        </Button>
                    </>
                )}
            </AuthContainer>
        </HeaderContainer>
    )
}