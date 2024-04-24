import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";


import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { endOfWeek, getWeek, startOfWeek } from 'date-fns';

import { FaRegCalendarCheck, FaRegCalendarTimes, FaRegCalendarMinus } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

import { ModalSameWeek } from "../modal/modalSameWeek";
import { ModalEditSchedule } from "../modal/modalEditSchedule";

import { Container, ContentContainer, MyScheduleContainer, NewScheduleContainer, ScheduleCards, WarningContainer } from "./styles";

export type optionsType = {
    value: string;
    label: string;
}

export type dataProps = {
    id?: string;
    name: string;
    date: string;
    email: string
    selectedOptions: optionsType[];
}

export const options: optionsType[] = [
    { value: "hairCut", label: "Corte de Cabelo" },
    { value: "hairTreatment", label: "Tratamento de Cabelo" },
    { value: "hairStraightening", label: "Alisamento de Cabelo" },
];

export function ScheduleBoard() {
    const { data: session } = useSession()
    const animatedComponents = makeAnimated();

    const [name, setName] = useState<string>(session?.user?.name ?? '');
    const [date, setDate] = useState<string>('')
    const [selectedOptions, setSelectedOptions] = useState<optionsType[]>([]);

    const [sameWeekModalIsOpen, setSameWeekModalIsOpen] = useState<boolean>(false)
    const [editScheduleModalIsOpen, setEditScheduleModalIsOpen] = useState<boolean>(false)

    const [dataToEdit, setDataToEdit] = useState<dataProps>()

    const [scheduleForTheSameDay, setScheduleForTheSameDay] = useState<boolean>()

    useEffect(() => {
        setName(session?.user?.name)
    }, [session])

    const dateOptions = [
        {
            id: uuidv4(),
            name: 'Batata',
            date: '2024-04-22',
            email: 'timoteopiano@gmail.com',
            selectedOptions: [
                { value: "hairCut", label: "Corte de Cabelo" },
                { value: "hairTreatment", label: "Tratamento de Cabelo" }
            ],
            status: 'REFUSED'
        },
        {
            id: uuidv4(),
            name: 'Batata 2',
            date: '2024-11-30',
            email: 'timoteopiano@gmail.com',
            selectedOptions: [
                { value: "hairCut", label: "Corte de Cabelo" },
                { value: "hairTreatment", label: "Tratamento de Cabelo" }
            ],
            status: 'RECEIVED'
        },
        {
            id: uuidv4(),
            name: 'Batata 2',
            date: '2024-11-30',
            email: 'timoteopiano@gmail.com',
            selectedOptions: [
                { value: "hairCut", label: "Corte de Cabelo" },
                { value: "hairTreatment", label: "Tratamento de Cabelo" }
            ],
            status: 'CONFIRMED'
        }
    ];

    const icons = {
        RECEIVED: <FaRegCalendarMinus />,
        CHANGED: <FaRegCalendarMinus />,
        CONFIRMED: <FaRegCalendarCheck />,
        REFUSED: <FaRegCalendarTimes />,
    };

    function toggleSameWeekModal() {
        setSameWeekModalIsOpen(!sameWeekModalIsOpen)
    }

    function toggleEditScheduleModal() {
        setEditScheduleModalIsOpen(!editScheduleModalIsOpen)
    }

    function scheduleToEdit(data) {
        toggleEditScheduleModal()

        setDataToEdit(data)
    }

    async function registerSchedule(data: dataProps) {
        await axios.post(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedule`, {
            id: uuidv4(),
            status: 'RECEIVED',
            ...data
        })
    }

    async function verifyDate(){
        const dateToCheck = new Date(date)
        const currentDate = new Date();
        const startOfWeekToCheck = startOfWeek(dateToCheck, { weekStartsOn: 0 });
        const endOfWeekToCheck = endOfWeek(dateToCheck, { weekStartsOn: 0 });
    
        const hasSchedule = dateOptions.filter(obj => {
            const objWeek = getWeek(obj.date, { weekStartsOn: 0 });
            const objStartOfWeek = startOfWeek(obj.date, { weekStartsOn: 0 });
            const objEndOfWeek = endOfWeek(obj.date, { weekStartsOn: 0 });
    
            return  objWeek === getWeek(dateToCheck, { weekStartsOn: 0 }) &&
                    objStartOfWeek >= startOfWeekToCheck &&
                    objEndOfWeek <= endOfWeekToCheck &&
                    new Date(obj.date) >= currentDate;
        }).length > 0

        return hasSchedule
    }

    function isWithinLastTwoDays(dateString: string) {
        const inputDate = new Date(dateString);
        const now = new Date();
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(now.getDate() - 2);
      
        return inputDate >= twoDaysAgo && inputDate <= now;
      }

    async function handleSubmit(event) {
        event.preventDefault()

        const inputDate = new Date(date);
        const now = new Date();

        const data = {
            name,
            email: session.user.email,
            date,
            selectedOptions,
        }

        const isInTheSameWeek = await verifyDate()
        const isInTwoDaysAgo = isWithinLastTwoDays(date)

        if(!date || inputDate <= now){
            return toast.warning('A data nao pode ser retroativa ou nula!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


        if(isInTheSameWeek){
            toggleSameWeekModal() 
        } else {
            registerSchedule(data)
                .then(() => {
                    toast.success('Agendamento realizado com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(() => {
                    toast.error('Ocorreu um erro ao realizar o agendamento, tente novamente!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        }
    }

    return (
        <Container>
            <ContentContainer>
                <NewScheduleContainer>
                    <h3>Agendar Serviço</h3>
                    <div>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <label>Nome</label>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Data</label>
                            <input
                                name="date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                            <label>Serviços</label>
                            <Select
                                name="services"
                                components={animatedComponents}
                                placeholder="Selecione o serviço"
                                isMulti
                                options={options}
                                onChange={(item: any) => setSelectedOptions(item)}
                                className="select"
                                isClearable={true}
                                isSearchable={true}
                                isDisabled={false}
                                isLoading={false}
                                isRtl={false}
                                closeMenuOnSelect={false}
                            />

                            <button type="submit">
                                Agendar
                            </button>
                        </form>
                    </div>
                </NewScheduleContainer>
                <MyScheduleContainer>
                    <h3>Meus Agendamentos</h3>

                    <WarningContainer>
                        <CiWarning /> 
                        <label>
                            Alterações de agendamento podem ser realizadas com no máximo 2 dias de antecedência.
                        </label>
                    </WarningContainer>

                    <div>
                        {dateOptions.map(schedule => {
                            const date = new Date(schedule.date);
                            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
                            const formatter = new Intl.DateTimeFormat('pt-BR', options);
                            const formattedDate = formatter.format(date);

                            const isDisabled = isWithinLastTwoDays(schedule.date)

                            return (
                                <ScheduleCards
                                    key={schedule.id}
                                    onClick={() => scheduleToEdit(schedule)}
                                    disabled={isDisabled}
                                >
                                    <span>
                                        {icons[schedule.status]}
                                        {formattedDate}
                                    </span>
                                </ScheduleCards>
                            )
                        })}
                    </div>
                </MyScheduleContainer>

                <ModalSameWeek 
                    isOpen={sameWeekModalIsOpen} 
                    toggleModal={toggleSameWeekModal} 
                    date={date} 
                    isForSameDay={setScheduleForTheSameDay}
                />

                <ModalEditSchedule 
                    isOpen={editScheduleModalIsOpen} 
                    toggleModal={toggleEditScheduleModal} 
                    dataToEdit={dataToEdit} 
                    isForSameDay={setEditScheduleModalIsOpen}
                />
            </ContentContainer>
        </Container>
    )
}