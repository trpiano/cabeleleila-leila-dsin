import { useEffect, useState } from "react";

// Libs
import { FaEdit } from "react-icons/fa";
import { MdPerson, MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";

//Internal Modals
import ModalAdminEditSchedule from "../modal/modalAdminEditSchedule";

//API Endpoints
import { getSchedules } from "../../../pages/api/schedule-api";

//Constants Values
import { dataProps } from "../../../constants/types";

//Custom Styles
import { CardsCel, Container, ContentContainer, ServicesCard, StatusCel } from "./styles";
import { DateFormatter, defaultFormatter, statusMessage } from "../../../constants/objects";
import { parse } from "date-fns";
import { NotFoundSchedulesContainer } from "../../client/scheduleBoard/styles";
import { CiCircleInfo } from "react-icons/ci";


export default function AdminScheduleBoard() {
    const [schedules, setSchedules] = useState([]);
    const [adminEditScheduleModalIsOpen, setAdminEditScheduleModalIsOpen] = useState(false);

    const [dataToEdit, setDataToEdit] = useState<dataProps>()

    const orderedData =
    Array.isArray(schedules) && schedules.length > 0 && 
        schedules.sort((a, b) => {
            const dateA = parse(a.date, 'yyyy-MM-dd', new Date()).valueOf();
            const dateB = parse(b.date, 'yyyy-MM-dd', new Date()).valueOf();
            return dateA - dateB;
        });


    async function fetchSchedules() {
        await getSchedules()
            .then(response => {
                setSchedules(response)
            })
            .catch(() => {
                toast.error('Ocorreu um erro carregar os agendamento, tente novamente!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    function toggleEditScheduleModal() {
        setAdminEditScheduleModalIsOpen(!adminEditScheduleModalIsOpen)
    }

    function scheduleToEdit(data) {
        toggleEditScheduleModal()

        setDataToEdit(data)
    }

    return (
        <Container>
            <h3>Agendamentos</h3>

            <ContentContainer>
                {Array.isArray(orderedData) && orderedData.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data</th>
                                <th>Serviços</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(orderedData.map(schedule => {
                                const formattedDate = DateFormatter(schedule.date)

                                return (
                                    <tr key={schedule.id}>
                                        <td>{schedule.name}</td>
                                        <td>{schedule.email}</td>
                                        <td>{formattedDate}</td>
                                        <CardsCel>
                                            {schedule.selectedOptions.map(option => {
                                                return (
                                                    <ServicesCard>
                                                        {option.label}
                                                    </ServicesCard>
                                                )
                                            })}
                                        </CardsCel>
                                        <td>
                                            <StatusCel
                                                status={schedule.status.value}
                                            >
                                                {statusMessage[schedule.status.value]}
                                            </StatusCel>
                                        </td>
                                        <td>
                                            <button onClick={() => scheduleToEdit(schedule)}><FaEdit /></button>
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </table>
                    :
                    <NotFoundSchedulesContainer>
                        <CiCircleInfo />
                        <span>Nao ha nenhum agendamento!</span>
                    </NotFoundSchedulesContainer>
                }
            </ContentContainer>

            <ModalAdminEditSchedule
                isOpen={adminEditScheduleModalIsOpen}
                toggleModal={toggleEditScheduleModal}
                data={dataToEdit}
                refetchSchedules={fetchSchedules}
            />
        </Container>
    )
}