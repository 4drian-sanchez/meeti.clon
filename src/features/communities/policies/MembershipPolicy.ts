import { User } from "better-auth";
import { SelectComunity } from "../types/community.types";

export class MembershipPolicy {
    static canEdit( user: User, community: SelectComunity ) : boolean {
        return user.id === community.createdBy
    }

    static canDelete( user: User, community: SelectComunity ) : boolean {
        return user.id === community.createdBy
    }

    static canJoin( user: User, community: SelectComunity, isMember: boolean ) : boolean {
        //* EL admin no puede unirse a la comunidad
        if( user.id === community.createdBy ) return false

        //* Solo mienbros se pueden unir en la comunidad
        return isMember
    }
}