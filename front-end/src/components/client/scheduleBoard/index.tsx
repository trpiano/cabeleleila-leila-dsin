import { useSession } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Container, ContentContainer, MyScheduleContainer, NewScheduleContainer } from "./styles";
import { useState } from "react";

export function ScheduleBoard() {
    const { data: session } = useSession()
    const animatedComponents = makeAnimated();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)

        reset()
      };

    const options = [
        { value: "hairCut", label: "Corte de Cabelo" },
        { value: "hairTreatment", label: "Tratamento de Cabelo" },
        { value: "hairStraightening", label: "Alisamento de Cabelo" },
    ];

    return (
        <Container>
            <ContentContainer>
                <NewScheduleContainer>
                    <h3>Agendar Serviço</h3>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Nome</label>
                            <input
                                name="name"
                                type="text"
                                {...register("name")}
                            />
                            <label>Data</label>
                            <input
                                name="date"
                                type="date"
                            {...register("date")}
                            />
                            <label>Serviços</label>
                            <Select
                                name="services"
                                components={animatedComponents}
                                placeholder="Selecione o serviço"
                                isMulti
                                options={options}
                                className="select"
                                isClearable={true}
                                isSearchable={true}
                                isDisabled={false}
                                isLoading={false}
                                isRtl={false}
                                closeMenuOnSelect={false}
                                {...register("services")}
                            />

                            <button type="submit">
                                Agendar
                            </button>
                        </form>
                    </div>
                </NewScheduleContainer>
                <MyScheduleContainer>
                    <h3>Meus Agendamentos</h3>
                </MyScheduleContainer>
            </ContentContainer>
        </Container>
    )
}