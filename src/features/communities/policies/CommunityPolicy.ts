import { User } from "better-auth";
import { SelectComunity } from "../types/community.types";

export class CommunityPolicy {

    static isAdmin( user : User, community: SelectComunity ) {
        return user.id === community.createdBy
    }

    static canViewMembers( user : User, community: SelectComunity ) {
        return user.id === community.createdBy
    }
}