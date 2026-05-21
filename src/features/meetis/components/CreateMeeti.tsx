"use client"

import MeetiForm from "./MeetiForm";
import { FormSubmit, Form } from "@/src/shared/components/forms";
import { useSession } from "@/src/lib/auth-client";
import { useForm, FormProvider } from "react-hook-form";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
                lat: 25.776311,
                lng: -80.3121477
            }
        }
    })

    const { isPending } = useSession()
    if (isPending) return 'cargando...'

    const onSubmit = () => {
        console.log('Paso la validacion');
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