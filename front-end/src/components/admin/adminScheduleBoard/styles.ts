import styled from "styled-components";

type StatusProps = {
    status: 'RECEIVED' | 'CHANGED' | 'CONFIRMED' | 'REFUSED'
}

export const Container = styled.section`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2rem;

    gap: 2rem;

    h3{
        color: var(--white);
        font-size: 1.5rem;
    }
`

export const ContentContainer = styled.div`
    width: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 2rem;

    table{
        width: 100%;

        thead{
            th{
                padding: 1rem 0.5rem;
            }

            tr{
                background: var(--blue-600);
                color: var(--white);

                border-radius: 1rem;
            }
        }

        tbody{
            td{
                padding: 1rem 0.5rem;
                border-bottom: 1px solid var(--blue-600);

                button{
                    background: none;
                    padding: 0 1rem;
                    border: none;
                }
            }

            td:last-child{
                border: none;
            }
        }
    }
`

export const CardsCel = styled.td`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 0.25rem;
`

export const ServicesCard = styled.span`
    padding: 0.25rem;

    background: var(--blue-400);
    border-radius: 0.25rem;
`

const colors = {
    RECEIVED: '#036ffc',
    CHANGED: '#ffcc00',
    CONFIRMED: '#33cc95',
    REFUSED: '#e52e4d'
}

export const StatusCel = styled.span <StatusProps>`
    padding: 0.25rem;

    background: ${(props) => props.status
        ? colors[props.status]
        : 'transparent'
    };
    border-radius: 0.25rem;
`