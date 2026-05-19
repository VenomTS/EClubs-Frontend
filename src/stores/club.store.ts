import {defineStore} from "pinia";
import {ClubsApi, type CreateClubRequest, type GetClubResponse, type GetUserResponse} from "../../api";
import {handleApi} from "./handleApi.ts";

const clubsApi = new ClubsApi();

export const useClubStore = defineStore("club", () => {

    const getClubsByUserId = (userId: string) =>
        handleApi<GetClubResponse[]>(() =>
            clubsApi.getClubsForUser(userId)
        );

    const getClubById = (clubId: string) =>
        handleApi<GetClubResponse>(() =>
            clubsApi.getClubById(clubId)
        );

    const createClub = (request: CreateClubRequest) =>
        handleApi<GetClubResponse>(() =>
            clubsApi.createClub(request)
        );

    const getStudentsByClubId = (clubId: string) =>
        handleApi<GetUserResponse[]>(() =>
            clubsApi.getStudentsInClub(clubId)
        );

    return {
        getClubsByUserId,
        getClubById,
        createClub,
        getStudentsByClubId,
    };
});