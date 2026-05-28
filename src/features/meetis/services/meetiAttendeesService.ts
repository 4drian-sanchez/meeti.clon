import { type IMeetiAttendeesRepository, meetiAttendeesRepository } from "./meetiAttendeesRepository";


class MeetiAttendeesService {

    constructor(
        private readonly meetiAttendeesRepository : IMeetiAttendeesRepository
    ){}


}

export const meetiAttendeesService = new MeetiAttendeesService(meetiAttendeesRepository)