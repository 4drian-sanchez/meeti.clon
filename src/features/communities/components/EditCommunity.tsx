"use client"

import { Form, FormSubmit } from "@/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, communitySchema } from "../schemas/communitiesSchema";
import { SelectComunity } from "../types/community.types";
import { updatedCommunity } from "../actions/community.action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export default function EditCommunity({community, communityId} : {community : SelectComunity, communityId: string}) {

    const { name, image, description } = community

    const methods = useForm({
        resolver: zodResolver(communitySchema),
        defaultValues: {
            name,
            image,
            description
        }
    })

    const onSubmit =  async (  data : CommunityInput ) => {
        const {error, success} = await updatedCommunity(data, communityId)
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
            <Form onSubmit={ methods.handleSubmit( onSubmit ) }>
                <CommunityForm />
                <FormSubmit value='Editar comunidad'/>
            </Form>
        </FormProvider>
    </>
  );
}