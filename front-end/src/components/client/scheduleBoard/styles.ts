import styled from "styled-components";

export const Container = styled.section`
    width: 100%;

    padding-top: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ContentContainer = styled.div`
    width: 80%;

    padding: 1.5rem 0.75rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1,875rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    h3{
        color: var(--white);
        font-size: 1.5rem;
    }
`

export const MyScheduleContainer = styled.div`
    width: 100%;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1rem;

    div{
        padding: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;
    }
`

export const WarningContainer = styled.div`
    max-width: 500px;

    background: rgba(255,204,0, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    gap: 1rem;

    padding: 1rem;

    border-radius: 0.5rem;
`

export const NewScheduleContainer = styled.div`
    width: 100%;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 1rem;

    div{
        width: 100%;

        form{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            label{
                padding: 1rem 0 0 0;

                color: var(--white);
            }

            input{
                width: 100%;
                margin: 0.25rem 0 0 0;

                padding: 0.5rem;

                color: #333333;
                
                border: none;
                border-radius: 0.25rem;
            }

            .select{
                width: 100%;
            }

            button{
                width: 100%;

                margin-top: 1rem;

                gap: 0.75rem;

                background: var(--blue-600);
                color: var(--white);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;

                img{
                    width: 30px;

                    border-radius: 50%;
                }
                
                :hover{
                    transition: 0.4s;

                    opacity: 0.8;
                    scale: 1.1;
                }
            }
        }
    }
`

export const ScheduleCards = styled.button`
    width: 500px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: var(--blue-600);
    color: var(--white);

    padding: 0.5rem 1rem;

    border-radius: 0.25rem;
    border: none;

    span{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;
    }
`