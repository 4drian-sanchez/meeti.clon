import { Metadata } from "next";
import generatePageTitle from "@/src/shared/utils/metadata";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CreateMeetiForm from "@/src/features/meetis/CreateMeetiForm";

const title = 'Crear Meeti'

export const metadata: Metadata = {
    title: generatePageTitle(title),
    description: 'Crear Meeti'
}

export default function MeetisCreate() {
    return (
        <>
            <Heading>{title}</Heading>
            <Link
                href="/dashboard/meetis"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a tus Meetis</Link>

            <Form>
                <CreateMeetiForm />
                <FormSubmit value={'Crear Meeti'} />
            </Form>
        </>
    );
}