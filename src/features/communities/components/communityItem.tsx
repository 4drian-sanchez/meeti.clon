import Image from "next/image"
import { CommunityWithPermissions } from "../types/community.types"
import Link from "next/link"
import CommunityDropdownMenu from "./communityDropdownMenu"


export default function CommunityItem({ community }: { community: CommunityWithPermissions }) {

    const { data: { image, name, description }, context: {isAdmin} } = community

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-start min-w-0 gap-x-4">
                <div className="size-32 flex-none overflow-hidden">
                    <Image
                        src={image}
                        alt={`Imagen Comunidad `}
                        className="object-cover w-full h-full"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="min-w-0 flex-auto">
                    <Link href={`/`} className="hover:underline font-bold text-lg">
                        {name}
                    </Link>
                    <p className="text-gray-600 text-sm">{description}</p>
                    <p className="text-gray-600 text-sm"></p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                {/* DROPDOWN MENU */}
                { isAdmin && <CommunityDropdownMenu  community={community.data}/> }
            </div>
        </li>
    )
}