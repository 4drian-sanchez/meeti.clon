import { defineRelations } from "drizzle-orm";
import * as schema from "../schemas";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId
    })
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id
    })
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id
    })
  },
  communityMembers: {
    community: r.one.comunity({
      from: r.communityMembers.communityId,
      to: r.comunity.id,
      optional: false
    }),
    user: r.one.users({
      from: r.communityMembers.userId,
      to: r.users.id,
      optional: false
    })
  },
  meeti: {
    location: r.one.meetiLocations({
      from: r.meeti.id,
      to: r.meetiLocations.meetiId
    }),
    category: r.one.categories({
      from: r.meeti.categoryId,
      to: r.categories.id,
      optional: false
    }),
    community: r.one.comunity({
      from: r.meeti.communityId,
      to: r.comunity.id,
      optional: false
    }),
    admin: r.one.users({
      from: r.meeti.createdBy,
      to: r.users.id,
      optional: false
    })
  }
}));