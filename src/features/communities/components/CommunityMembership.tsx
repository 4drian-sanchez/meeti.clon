"use client"

import { useState } from "react";
import { CommunityPermissions } from "../types/community.types";
import { MembershipAction } from "../actions/membership.action";

type CommunityMembershipTypes = {
    permissions: CommunityPermissions
    communityId: string
}

export default function CommunityMembership( {permissions, communityId} : CommunityMembershipTypes ) {

    const [ canJoin, setCanJoin ] = useState(permissions.canJoin)
    const [ canLeave, setCanLeave ] = useState(permissions.canLeave)


    const handleCanJoin = async () => {
        await MembershipAction(communityId)
    }

  return (
    <>

        {
            canJoin && (
                <button
                    onClick={ () => handleCanJoin() } 
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
                >
                    Inscribirse a la comunidad
                </button>
            )
        }

        {
            canLeave && (
                <button
                    className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
                >
                    Abandonar Comunidad
                </button>
            )
        }
    </>
  );
}