export interface InterimApplicationResponse {
    interimId?: number;
    gradeId: number;
    placementId: number;
    newPlacementId: number;
    referenceNumber: string | null;
    startDate: string;
    endDate: string;
    reason: string;
    isDraft: boolean;
    isReadOnly?: boolean;
}