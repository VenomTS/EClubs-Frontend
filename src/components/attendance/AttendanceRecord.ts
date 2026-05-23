export type AttendanceStatus = "prisutan" | "odsutan"

export interface AttendanceRecord {
    studentId: string
    status: AttendanceStatus
}