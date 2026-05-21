import { Metadata } from "next";
import generatePageTitle from "@/src/shared/utils/metadata";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import CreateMeeti from "@/src/features/meetis/components/CreateMeeti";

const title = 'Crear Meeti'

export const metadata: Metadata = {
    title: generatePageTitle(title),
    description: 'Crear Meeti'
}

export default async function MeetisCreate() {

    const { session } = await requireAuth()
    if(!session) redirect('/auth/login')
        
    return (
        <>
            <Heading>{title}</Heading>
            <Link
                href="/dashboard/meetis"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a tus Meetis</Link>

            <CreateMeeti / >
        </>
    );
}