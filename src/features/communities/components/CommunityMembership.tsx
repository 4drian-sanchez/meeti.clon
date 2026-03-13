"use client"

import { useState } from "react";
import { CommunityPermissions } from "../types/community.types";
import { MembershipAction } from "../actions/membership.action";
import toast from "react-hot-toast";

type CommunityMembershipTypes = {
    permissions: CommunityPermissions
    communityId: string
}

export default function CommunityMembership({ permissions, communityId }: CommunityMembershipTypes) {
    const [canJoin, setCanJoin] = useState<boolean>(permissions.canJoin)

    const handleCanJoin = async () => {
        const result = await MembershipAction(communityId)
        if (result?.success) {
            toast.success(result.message)
            setCanJoin(result.newPermissions.canJoin)
        }
    }

    return (
        <>


            <button
                onClick={() => handleCanJoin()}
                className={`${canJoin ? 'bg-orange-600' : 'bg-red-600'} font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer`}
            >
                {canJoin ? 'Inscribirse a la comunidad' : 'Abandonar Comunidad'}
            </button>

        </>
    );
}