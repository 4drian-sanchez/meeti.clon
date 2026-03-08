"use client"

import { Form, FormSubmit } from "@/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, CommunitySchema } from "../schemas/communitiesSchema";
import { communityAction } from "../actions/community.action";

export default function CreateCommunity() {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        defaultValues: {
            name: '',
            description: ''
        },
    })

    const onSubmit = async (data : CommunityInput) => {
        await communityAction(data)
    }

    return (
        <>
            <FormProvider {...methods}>

                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <CommunityForm />
                    <FormSubmit value='Crear comunidad' />
                </Form>
            </FormProvider>
        </>
    );
}