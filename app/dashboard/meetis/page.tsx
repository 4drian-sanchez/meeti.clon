import { Metadata } from "next";
import generatePageTitle from '../../../src/shared/utils/metadata';
import Link from "next/link";
import Heading from '../../../src/shared/components/typography/Heading';
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import { getUpcominngMeetisByUserId } from "@/src/features/meetis/actions/meeti-actions";
import { formatMeetiDate } from "@/src/shared/utils/date";
import { pluralize } from "@/src/db/utils/strings";
import Image from "next/image";
import MeetiDropdownMenu from "@/src/features/meetis/components/MeetiDropDownMenu";
import { MeetiPolicy } from "@/src/features/meetis/policies/meeti.policy";

const title = 'Administra tus metis'

export const metadata: Metadata = {
    title: generatePageTitle(title),
    description: 'Administra tus meetis'
}

export default async function MeetisPage() {

    const { session } = await requireAuth()
    if (!session) redirect('/auth/login')

    const getComingMeetis = await getUpcominngMeetisByUserId(session.user)

    return (
        <>
            <Heading>{title}</Heading>
            <Link
                href="/dashboard/meetis/create"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl 
                text-white py-3 px-10  font-bold"
            >Crear Meeti</Link>

            {
                getComingMeetis.length ? (
                    <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-10 shadow-lg p-10">
                        {
                            getComingMeetis.map(meeti => {

                                const { title, date, time, image, id } = meeti.data

                                return (
                                    <li key={id} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex items-center min-w-0 gap-x-4">
                                            <Image
                                                src={image}
                                                alt={`Imagen del meeti ${title}`}
                                                className="w-40"
                                                height={250}
                                                width={400}
                                                priority
                                            />
                                            <div className="min-w-0 flex-auto">
                                                <Link 
                                                    className="hover:underline font-bold text-lg"
                                                    href={`/meeti/${id}`}
                                                >
                                                    {title}
                                                </Link>
                                                <p className="text-gray-600 text-sm">
                                                    {formatMeetiDate(date, time)}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    {meeti.attendanceCount} {pluralize('Asistente', meeti.attendanceCount)}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            MeetiPolicy.isAdmin(session.user, meeti.data) ? (
                                                <div className="flex shrink-0 items-center gap-x-6">
                                                    <MeetiDropdownMenu meeti={meeti.data} />
                                                </div>
                                            ) : null

                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>

                ) : (
                    <p className="text-center mt-10 text-lg">No Hay Meetis Aún. {''}
                        <Link
                            href={'/dashboard/meetis/create'}
                            className="text-orange-500 font-bold block"
                        >Comienza Creando Uno </Link>
                    </p >
                )
            }


        </>
    );
}