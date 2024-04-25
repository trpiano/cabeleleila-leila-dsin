import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Libs
import { toast } from "react-toastify";
import makeAnimated from "react-select/animated";
import { addDays, isBefore, parse } from 'date-fns';
import { CiWarning, CiCircleInfo, CiRead } from "react-icons/ci";

//Internal Components
import { ModalSameWeek } from "../modal/modalSameWeek";
import { ModalEditSchedule } from "../modal/modalEditSchedule";
import { ModalViewDetails } from "../../modals/modalViewDetails";
import { Filter } from "../../filter";

//API Endpoints
import { getSchedules, registerSchedule } from "../../../pages/api/schedule-api";

//Constants Values
import { ValueType, dataProps, optionsType } from "../../../constants/types";
import { DateFormatter, icons, options } from "../../../constants/objects";

//Custom Styles
import { Container, ContentContainer, FormContainer, MyScheduleContainer, NewScheduleContainer, NotFoundSchedulesContainer, ScheduleCards, SchedulesContainer, WarningContainer } from "./styles";
import { StyledSelect } from "../../../styles/global";

export function ScheduleBoard() {
    const { data: session } = useSession();
    const animatedComponents = makeAnimated();

    const [name, setName] = useState<string>(session?.user?.name ?? '');
    const [date, setDate] = useState<string>();
    const [selectedOptions, setSelectedOptions] = useState<optionsType[]>([]);

    const [schedules, setSchedules] = useState([]);

    const [sameWeekModalIsOpen, setSameWeekModalIsOpen] = useState<boolean>(false);
    const [datesInTheSameWeek, setDatesInTheSameWeek] = useState<dataProps[]>([]);

    const [editScheduleModalIsOpen, setEditScheduleModalIsOpen] = useState<boolean>(false);
    const [viewDetailsModalIsOpen, setViewDetailsModalIsOpen] = useState<boolean>(false);

    const [showOldestData, setShowOldestData] = useState<boolean>(false);
    const [rangeDate, setRangeDate] = useState<ValueType>();

    const [dataToEdit, setDataToEdit] = useState<dataProps>();
    const [dataToView, setDataToView] = useState<dataProps>();

    const orderedData =
        Array.isArray(schedules) && schedules.length > 0 &&
        schedules.sort((a, b) => {
            const dateA = parse(a.date, 'yyyy-MM-dd', new Date()).valueOf();
            const dateB = parse(b.date, 'yyyy-MM-dd', new Date()).valueOf();
            return dateA - dateB;
        });

    let hasWithinLastTwoDays = isWithinLastTwoDays(orderedData);

    async function fetchSchedules() {
        await getSchedules(showOldestData, rangeDate, session?.user?.email)
            .then(response => {
                setSchedules(response)
            })
    }

    useEffect(() => {
        !name && setName(session?.user?.name)

        fetchSchedules()
    }, [session])

    useEffect(() => {
        fetchSchedules()
    }, [showOldestData, rangeDate])

    useEffect(() => {
        hasWithinLastTwoDays = isWithinLastTwoDays(orderedData)
    }, [schedules])

    function toggleSameWeekModal() {
        setSameWeekModalIsOpen(!sameWeekModalIsOpen)
    }

    function toggleEditScheduleModal() {
        setEditScheduleModalIsOpen(!editScheduleModalIsOpen)
    }

    function toggleViewDetailsModal() {
        setViewDetailsModalIsOpen(!viewDetailsModalIsOpen)
    }


    function scheduleToEdit(data) {
        toggleEditScheduleModal()

        setDataToEdit(data)
    }

    function scheduleToView(data) {
        toggleViewDetailsModal()

        setDataToView(data)
    }

    async function verifyDate() {
        const dateToCheck = new Date(date);
        const weekStart = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate() - dateToCheck.getDay());
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

        return Array.isArray(schedules) && schedules.length > 0 && schedules.filter((schedule) => {
            const scheduleDate = new Date(schedule.date)

            return scheduleDate >= weekStart && scheduleDate <= weekEnd;
        });
    }

    function isWithinLastTwoDays(input: any) {
        if (Array.isArray(input)) {
            return input.some(item => isPastDate(item.date));
        } else if (typeof input === 'string') {
            const inputDate = new Date(input);
            const today = new Date();
            const twoDaysFromNow = addDays(today, 2);

            return isBefore(inputDate, twoDaysFromNow);
        } else {
            return false;
        }
    }

    function isPastDate(input: any) {
        const currentDate = new Date()
        const scheduleDate = new Date(input)

        return  scheduleDate.getTime() < currentDate.getTime()
    }

    const data = {
        name,
        email: session?.user?.email,
        date,
        selectedOptions,
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const [year, month, day] = date.split('-');
        const inputDate = new Date(Number(year), Number(month) - 1, Number(day)).getDate();
        const now = new Date().getDate();

        const isInTheSameWeek = await verifyDate()

        if (!date || inputDate < now) {
            return toast.warning('A data não pode ser retroativa ou nula!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if (selectedOptions.length < 1) {
            return toast.warning('O serviço não pode vazio!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if (isInTheSameWeek.length >= 1) {
            setDatesInTheSameWeek(isInTheSameWeek)

            toggleSameWeekModal()
        } else {
            registerSchedule(data)
                .then(() => {
                    fetchSchedules()
                })
        }
    }

    return (
        <Container>
            <ContentContainer>
                <Filter
                    rangeDate={rangeDate}
                    setRangeDate={setRangeDate}
                    showOldestData={showOldestData}
                    setShowOldestData={setShowOldestData}
                />

                <SchedulesContainer>
                    <NewScheduleContainer>
                        <h3>Agendar Serviço</h3>
                        <FormContainer>
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
                                <StyledSelect
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
                        </FormContainer>
                    </NewScheduleContainer>
                    <MyScheduleContainer>
                        <h3>Meus Agendamentos</h3>


                        {hasWithinLastTwoDays
                            ?
                            <WarningContainer>
                                <CiWarning />
                                <span>
                                    Alterações de agendamento podem ser realizadas com no máximo 2 dias de antecedência. Apos isso apenas por telefone.
                                </span>
                            </WarningContainer>
                            : <></>
                        }

                        <div>
                            {Array.isArray(orderedData) && orderedData.length > 0
                                ? (orderedData.map(schedule => {
                                    const formattedDate = DateFormatter(schedule.date)

                                    const isDisabled = isWithinLastTwoDays(schedule.date)
                                    const canViewDetails = isPastDate(schedule.date)

                                    return (
                                        <ScheduleCards
                                            key={schedule.id}
                                            onClick={() => isDisabled ? {} : scheduleToEdit(schedule)}
                                            isDisabled={isDisabled}
                                        >
                                            <span>
                                                {icons[schedule.status.value]}
                                                {formattedDate}
                                            </span>
                                            {canViewDetails 
                                            ? (<button
                                                    disabled={!isDisabled}
                                                    onClick={() => scheduleToView(schedule)}
                                                >
                                                    <CiRead /> Ver Detalhes
                                                </button>) 
                                            : (<></>)}
                                        </ScheduleCards>
                                    )
                                }))
                                :
                                <NotFoundSchedulesContainer>
                                    <CiCircleInfo />
                                    <span>Você nao possui nenhum agendamento!</span>
                                </NotFoundSchedulesContainer>
                            }
                        </div>
                    </MyScheduleContainer>
                </SchedulesContainer>
            </ContentContainer>

            <ModalSameWeek
                isOpen={sameWeekModalIsOpen}
                toggleModal={toggleSameWeekModal}
                data={data}
                datesInTheSameWeek={datesInTheSameWeek}
                refetchSchedules={fetchSchedules}
            />

            <ModalEditSchedule
                isOpen={editScheduleModalIsOpen}
                toggleModal={toggleEditScheduleModal}
                data={dataToEdit}
                refetchSchedules={fetchSchedules}
            />

            <ModalViewDetails 
                isOpen={viewDetailsModalIsOpen}
                toggleModal={toggleViewDetailsModal}
                data={dataToView}
            />
        </Container>
    )
}