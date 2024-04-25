import axios from "axios";

import { ValueType, dataProps } from "../../constants/types";
import { toast } from "react-toastify";
import { DateFormatter as DateFormatter } from "../../constants/objects";

export async function getAdminAccounts(data: string): Promise<boolean> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/admin`, {
            params: {
                email: data,
            }
        });

        if(response.status !== 200 || response.data.length === 0) {
            return false
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getSchedules(showOldestData?: boolean, rangeDate?: ValueType, email?: string, ): Promise<dataProps[]> {
    try {
        const formattedDates = rangeDate && rangeDate.map(date => {
            const d = new Date(date);
            return d.toISOString().substring(0, 10)
        });

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedules`, {
            params: {
                email,
                showOldestData,
                startFilterDate: formattedDates && formattedDates[0],
                endFilterDate: formattedDates && formattedDates[1]
            },
        });

        return response.data;
    } catch (error) {
        if (error?.response?.status !== 404) {
            toast.error('Ocorreu um erro carregar os agendamento, tente novamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.error(error);

            return error?.data?.massage;
        }
    }
}

export async function editSchedule(scheduleData: dataProps, isAdmin: any): Promise<void> {
    if (!scheduleData.id) {
        throw new Error('ID do agendamento é obrigatório');
    }

    try {
        if (isAdmin.length > 0) {
            await axios.put(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedules/${scheduleData.id}`, {
                ...scheduleData
            })
        } else {
            await axios.put(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedules/${scheduleData.id}`, {
                status: {
                    value: "CHANGED",
                    label: "Alterado"
                },
                ...scheduleData
            })
        }
    } catch (error) {
        console.error(error);
       
        return error?.data?.massage;
    }
}

export async function registerSchedule(data: dataProps) {
    try {
        const formattedDate = DateFormatter(data.date);

        await axios.post(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedules`, {
            status: 'RECEIVED',
            ...data
        })
            .then(() => {
                toast.success(`Agendamento realizado com sucesso para o dia ${formattedDate}!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    } catch (error) {
        console.error(error);

        toast.error('Ocorreu um erro ao realizar o agendamento, tente novamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return error?.data?.massage;
    }
}