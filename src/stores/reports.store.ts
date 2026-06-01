import {defineStore} from "pinia";
import {handleApi} from "./handleApi.ts";
import {
    type GetReportsResponse,
    ReportsApi
} from "../../api";

const reportsApi = new ReportsApi();

export const useReportsStore = defineStore("report", () => {

    const getReportsByClubId = (clubId: string) =>
        handleApi<GetReportsResponse[]>(() => reportsApi.getReportsByClubId(clubId));

    return {
        getReportsByClubId,
    };
});