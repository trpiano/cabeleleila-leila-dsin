import axios from "axios";

import { Cache } from 'cache-manager';

let scheduleCache: Cache;

import { dataProps } from "../../constants/types";
import { toast } from "react-toastify";
import { DateFormatter as DateFormatter } from "../../constants/objects";
import { useSession } from "next-auth/react";

export async function getAdminAccounts(data: string): Promise<string> {
    try {
        // const cachedSchedules = await scheduleCache.get<string>(email);

        // if (cachedSchedules) {
        //     return cachedSchedules;
        // }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/admin`, {
            params: {
                email: data,
            }
        });

        // await scheduleCache.set(data, response.data, 60); // Armazenar em cache por 60 segundos
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getSchedules(email?: string): Promise<dataProps[]> {
    try {
        // const cachedSchedules = await scheduleCache.get<dataProps[]>(props.email);

        // if (cachedSchedules || !props.forceRefetch) {
        //     return cachedSchedules;
        // }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedules`, {
            params: {
                email: email,
            }
        });

        // await scheduleCache.set(props.email, response.data, 60); // Armazenar em cache por 60 segundos
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
            throw error;
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
        throw error;
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

        throw error;
    }
}