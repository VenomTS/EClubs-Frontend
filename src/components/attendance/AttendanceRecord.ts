export type AttendanceStatus = "present" | "absent"

export interface AttendanceRecord {
    studentId: string
    status: AttendanceStatus
}