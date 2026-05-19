import {defineStore} from "pinia";
import {ClubMessagesApi, type CreateMessageRequest, type GetMessageResponse} from "../../api";
import {handleApi} from "./handleApi.ts";

// const messagesApi = new MessagesApi();
const clubMessagesApi = new ClubMessagesApi();

export const useMessageStore = defineStore("message", () => {

    const getMessagesByClubId = (clubId: string) =>
        handleApi<GetMessageResponse[]>(() =>
            clubMessagesApi.getMessagesByClubId(clubId)
        );

    const sendMessage = (clubId: string, message: CreateMessageRequest) =>
        handleApi<GetMessageResponse>(() =>
            clubMessagesApi.sendMessage(clubId, message)
        );

    return {
        getMessagesByClubId,
        sendMessage,
    };
});