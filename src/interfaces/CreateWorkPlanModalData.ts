export interface DomainOption {
    domainNumber: number
    domain: string
}

export interface CreateWorkPlanPayload {
    domainNumber: number
    domain: string
    lessonUnit: string
    learningOutcome: string
    indicators: string
    scheduledDate: Date | null
}