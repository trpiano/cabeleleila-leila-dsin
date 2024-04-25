import { FaRegCalendarCheck, FaRegCalendarMinus, FaRegCalendarTimes } from "react-icons/fa";

import { optionsType } from "./types";

export const icons = {
    RECEIVED: <FaRegCalendarMinus />,
    CHANGED: <FaRegCalendarMinus />,
    CONFIRMED: <FaRegCalendarCheck />,
    REFUSED: <FaRegCalendarTimes />,
};

export const statusMessage = {
    RECEIVED: "Recebido",
    CHANGED: "Alterado",
    CONFIRMED: "Confirmado",
    REFUSED: "Recusado",
}

export const options: optionsType[] = [
    { value: "hairCut", label: "Corte de Cabelo" },
    { value: "hairTreatment", label: "Tratamento de Cabelo" },
    { value: "hairStraightening", label: "Alisamento de Cabelo" },
];

export const statusOptions: optionsType[] = [
    { value: "RECEIVED", label: "Recebido" },
    { value: "CHANGED", label: "Alterado" },
    { value: "CONFIRMED", label: "Confirmado" },
    { value: "REFUSED", label: "Recusado" },
]

const defaultFormatterOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
export const defaultFormatter = new Intl.DateTimeFormat('pt-BR', defaultFormatterOptions);

export function DateFormatter(date: string): string {
    const dateParts = date.split("-");
    return `${dateParts[2].padStart(2, "0")}/${dateParts[1].padStart(2, "0")}/${dateParts[0]}`;
}