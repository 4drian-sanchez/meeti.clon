"use client"

import MeetiForm from "./MeetiForm";
import { FormSubmit, Form } from "@/src/shared/components/forms";
import { useSession } from "@/src/lib/auth-client";
import { useForm, FormProvider } from "react-hook-form";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMeetiAction } from "../actions/meeti-actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateMeeti() {

    const methods = useForm<MeetiInput>({
        resolver: zodResolver(MeetiSchema),
        defaultValues: {
            title: '',
            details: '',
            categoryId: '',
            communityId: '',
            availableSeats: 0,
            date: '',
            time: '',
            image: '',
            virtual: false,
            location: {
                placeName: '',
                address: '',
                city: '',
                country: '',
                lat: 8.138712,
                lng: -71.986879
            }
        }
    })

    const { isPending } = useSession()
    if (isPending) return 'cargando...'

    const onSubmit = async ( data : MeetiInput) => {
        const {error, success} = await createMeetiAction(data)
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
                    <FormSubmit value={'Crear Meeti'} />
                </Form>
            </FormProvider>
        </>
    );
}