import axios from "axios";

export type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; status: number; message?: string };

export async function handleApi<T>(
    apiCall: () => Promise<any>
): Promise<ApiResult<T>> {
    try {
        const response = await apiCall();

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                status: error.response?.status ?? 500,
                message: error.message,
            };
        }

        return {
            success: false,
            status: 500,
        };
    }
}