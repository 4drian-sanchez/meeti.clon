"use client"

import { Form, FormSubmit } from "@/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, CommunitySchema } from "../schemas/communitiesSchema";
import { communityAction } from "../actions/community.action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateCommunity() {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        defaultValues: {
            name: '',
            description: ''
        },
    })

    const onSubmit = async (data : CommunityInput) => {
        const {error, success} = await communityAction(data)

        if(error) {
            toast.error(error)
        }

        if(success) {
            toast.success(success)
            redirect('/dashboard/communities')
        }
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