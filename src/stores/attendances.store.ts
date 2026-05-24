import {defineStore} from "pinia";
import {AttendancesApi, type GetAttendanceResponse, type RegisterAttendanceRequest} from "../../api";
import {handleApi} from "./handleApi.ts";

// const messagesApi = new MessagesApi();
const attendancesApi = new AttendancesApi();

export const useAttendanceStore = defineStore("attendance", () => {

    const getAttendancesByClubId = (clubId: string) =>
        handleApi<GetAttendanceResponse[]>(() =>
            attendancesApi.getAttendancesForClub(clubId)
        );

    const markAttendance = (clubId: string, attendance: RegisterAttendanceRequest) =>
        handleApi(() =>
            attendancesApi.markStudentPresent(clubId, attendance)
        );

    const getUserAttendancesByClubId = (clubId: string, userId: string) =>
        handleApi<GetAttendanceResponse>(() => attendancesApi.getUserAttendancesForClub(clubId, userId));

    return {
        getAttendancesByClubId,
        markAttendance,
        getUserAttendancesByClubId
    };
});