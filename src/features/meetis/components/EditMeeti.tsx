"use client"

import {FormProvider, useForm } from "react-hook-form";
import { InsertMeeti, SelectMeeti } from "../types/meeti.types";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import MeetiForm from "./MeetiForm";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { updatedMeeti } from "../actions/meeti-actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type EditMeetiProps = {
    meeti: SelectMeeti
}

export function EditMeeti({ meeti }: EditMeetiProps) {

    const methods = useForm<MeetiInput>({
        resolver: zodResolver(MeetiSchema),
        defaultValues: meeti.virtual
            ? {
                ...meeti,
                virtual: true
            }
            : {
                ...meeti,
                location: meeti.location!
            }
    })


    const onSubmit = async ( data: MeetiInput ) => {

        const {error, success} = await updatedMeeti(data, meeti.id)

        if(error) toast.error(error)
        if(success) {
            toast.success(success)
            redirect('/dashboard/meetis')
        }
    }

    return ( 
        <>
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <MeetiForm />
                    <FormSubmit value={'Actualizar'} />
                </Form>
            </FormProvider>
        </>
    );
}