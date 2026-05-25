import {defineStore} from "pinia";
import {
    type ConcludeWorkPlanRequest,
    type CreateWorkPlanRequest, type GetDomainsResponse, type GetWorkPlanResponse, WorkPlansApi
} from "../../api";
import {handleApi} from "./handleApi.ts";

// const messagesApi = new MessagesApi();
const workPlansApi = new WorkPlansApi();

export const useWorkPlansStore = defineStore("workplans", () => {

    const getWorkPlansByClubId = (clubId: string) =>
        handleApi<GetWorkPlanResponse[]>(() =>
            workPlansApi.getWorkPlansForClub(clubId)
        );

    const getCurrentWorkPlan = (clubId: string) =>
        handleApi<GetWorkPlanResponse>(() =>
            workPlansApi.getCurrentWorkPlan(clubId)
        );

    const getDomainsByClubId = (clubId: string) =>
        handleApi<GetDomainsResponse[]>(() =>
            workPlansApi.getDomainsByClubId(clubId)
        );

    const createWorkPlan = (clubId: string, workPlan: CreateWorkPlanRequest) =>
        handleApi<GetWorkPlanResponse>(() =>
            workPlansApi.createWorkPlanForClub(clubId, workPlan)
        );

    const uploadWorkPlan = (clubId: string, file: File) =>
        handleApi(() => workPlansApi.uploadWorkPlansForClub(clubId, file))

    const concludeWorkPlan = (clubId: string, workPlan: ConcludeWorkPlanRequest) =>
        handleApi(() => workPlansApi.concludeWorkPlanForClub(clubId, workPlan))

    return {
        getWorkPlansByClubId,
        getCurrentWorkPlan,
        getDomainsByClubId,
        createWorkPlan,
        uploadWorkPlan,
        concludeWorkPlan,
    };
});